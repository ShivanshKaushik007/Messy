-- Hostel Mess Management System - Supabase Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Create Profiles Table (Linked to auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'admin')),
  full_name TEXT NOT NULL,
  room_number TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);

-- To avoid infinite recursion, we use a SECURITY DEFINER function to check admin status directly from auth.users
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS text
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE((raw_user_meta_data->>'role'), 'student') FROM auth.users WHERE id = auth.uid();
$$;

CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (
  public.get_user_role() = 'admin'
);

CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Trigger to automatically create a profile after user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role, full_name, room_number)
  VALUES (
    new.id, 
    new.email,
    COALESCE((new.raw_user_meta_data->>'role'), 'student'), 
    COALESCE((new.raw_user_meta_data->>'full_name'), 'Unknown'),
    new.raw_user_meta_data->>'room_number'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- 2. Create Menu Table
CREATE TABLE public.menu (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  day TEXT NOT NULL,
  breakfast TEXT NOT NULL,
  lunch TEXT NOT NULL,
  dinner TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.menu ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view menu" ON public.menu FOR SELECT USING (true);
CREATE POLICY "Admins can manage menu" ON public.menu FOR ALL USING (
  public.get_user_role() = 'admin'
);

-- Insert sample menu data
INSERT INTO public.menu (day, breakfast, lunch, dinner) VALUES 
('Monday', 'Poha, Jalebi', 'Rajma Chawal', 'Dal Makhani, Roti'),
('Tuesday', 'Aloo Paratha', 'Kadi Pakora', 'Paneer Butter Masala'),
('Wednesday', 'Idli Sambar', 'Chole Bhature', 'Mix Veg, Roti');


-- 3. Create Poll Responses Table
CREATE TABLE public.poll_responses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  meal_type TEXT CHECK (meal_type IN ('breakfast', 'lunch', 'dinner')),
  poll_date DATE DEFAULT CURRENT_DATE,
  will_eat BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, meal_type, poll_date)
);

ALTER TABLE public.poll_responses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Students can view their own polls" ON public.poll_responses FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Students can insert their own polls" ON public.poll_responses FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Students can update their own polls" ON public.poll_responses FOR UPDATE USING (auth.uid() = student_id);
CREATE POLICY "Admins can view all polls" ON public.poll_responses FOR SELECT USING (
  public.get_user_role() = 'admin'
);


-- 4. Create Attendances Table
CREATE TABLE public.attendances (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  meal_id TEXT NOT NULL,
  scanned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, meal_id)
);

ALTER TABLE public.attendances ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Students can view their own attendance" ON public.attendances FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Students can insert their own attendance" ON public.attendances FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Admins can view all attendance" ON public.attendances FOR SELECT USING (
  public.get_user_role() = 'admin'
);


-- 5. Create Complaints Table
CREATE TABLE public.complaints (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'resolved')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Students can view their own complaints" ON public.complaints FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Students can insert their own complaints" ON public.complaints FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Admins can view all complaints" ON public.complaints FOR SELECT USING (
  public.get_user_role() = 'admin'
);
CREATE POLICY "Admins can update complaints" ON public.complaints FOR UPDATE USING (
  public.get_user_role() = 'admin'
);


-- 6. Create Menu Suggestions Table
CREATE TABLE public.suggestions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  suggestion TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.suggestions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Students can view their own suggestions" ON public.suggestions FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Students can insert their own suggestions" ON public.suggestions FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Admins can view all suggestions" ON public.suggestions FOR SELECT USING (
  public.get_user_role() = 'admin'
);
