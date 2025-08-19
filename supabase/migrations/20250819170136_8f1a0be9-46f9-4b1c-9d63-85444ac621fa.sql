-- Create users profiles table for additional educator information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'educator',
  institution TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create assignments table
CREATE TABLE public.assignments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  unit_code TEXT NOT NULL,
  description TEXT,
  due_at DATE NOT NULL,
  owner_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create submissions table
CREATE TABLE public.submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  assignment_id UUID NOT NULL REFERENCES public.assignments ON DELETE CASCADE,
  student_id TEXT NOT NULL,
  content TEXT,
  file_url TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT content_or_file_required CHECK (content IS NOT NULL OR file_url IS NOT NULL)
);

-- Create evaluations table
CREATE TABLE public.evaluations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  submission_id UUID NOT NULL REFERENCES public.submissions ON DELETE CASCADE UNIQUE,
  classification TEXT NOT NULL CHECK (classification IN ('Human', 'AI', 'Hybrid')),
  confidence NUMERIC(3,2) NOT NULL,
  rubric_scores JSONB NOT NULL DEFAULT '{}',
  ai_feedback TEXT,
  teacher_notes TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evaluations ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create policies for assignments
CREATE POLICY "Educators can view their own assignments" 
ON public.assignments FOR SELECT 
USING (auth.uid() = owner_id);

CREATE POLICY "Educators can create assignments" 
ON public.assignments FOR INSERT 
WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Educators can update their own assignments" 
ON public.assignments FOR UPDATE 
USING (auth.uid() = owner_id);

CREATE POLICY "Educators can delete their own assignments" 
ON public.assignments FOR DELETE 
USING (auth.uid() = owner_id);

-- Create policies for submissions
CREATE POLICY "Educators can view submissions for their assignments" 
ON public.submissions FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.assignments 
    WHERE assignments.id = submissions.assignment_id 
    AND assignments.owner_id = auth.uid()
  )
);

CREATE POLICY "Educators can create submissions for their assignments" 
ON public.submissions FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.assignments 
    WHERE assignments.id = assignment_id 
    AND assignments.owner_id = auth.uid()
  )
);

CREATE POLICY "Educators can update submissions for their assignments" 
ON public.submissions FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.assignments 
    WHERE assignments.id = submissions.assignment_id 
    AND assignments.owner_id = auth.uid()
  )
);

-- Create policies for evaluations
CREATE POLICY "Educators can view evaluations for their submissions" 
ON public.evaluations FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.submissions 
    JOIN public.assignments ON assignments.id = submissions.assignment_id
    WHERE submissions.id = evaluations.submission_id 
    AND assignments.owner_id = auth.uid()
  )
);

CREATE POLICY "Educators can create evaluations for their submissions" 
ON public.evaluations FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.submissions 
    JOIN public.assignments ON assignments.id = submissions.assignment_id
    WHERE submissions.id = submission_id 
    AND assignments.owner_id = auth.uid()
  )
);

CREATE POLICY "Educators can update evaluations for their submissions" 
ON public.evaluations FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.submissions 
    JOIN public.assignments ON assignments.id = submissions.assignment_id
    WHERE submissions.id = evaluations.submission_id 
    AND assignments.owner_id = auth.uid()
  )
);

-- Create indexes for performance
CREATE INDEX idx_submissions_assignment ON public.submissions(assignment_id, created_at);
CREATE INDEX idx_evaluations_submission ON public.evaluations(submission_id);
CREATE INDEX idx_assignments_owner ON public.assignments(owner_id, created_at);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_assignments_updated_at
  BEFORE UPDATE ON public.assignments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_submissions_updated_at
  BEFORE UPDATE ON public.submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_evaluations_updated_at
  BEFORE UPDATE ON public.evaluations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, name, role)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email), 
    'educator'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();