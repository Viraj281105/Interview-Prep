-- Temporary policies to allow our Node.js seeder script to insert data
CREATE POLICY "Public insert subjects" ON public.subjects FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update subjects" ON public.subjects FOR UPDATE USING (true);

CREATE POLICY "Public insert topics" ON public.topics FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update topics" ON public.topics FOR UPDATE USING (true);

CREATE POLICY "Public insert questions" ON public.questions FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update questions" ON public.questions FOR UPDATE USING (true);

CREATE POLICY "Public insert companies" ON public.companies FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update companies" ON public.companies FOR UPDATE USING (true);
