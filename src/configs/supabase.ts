import { createClient } from '@supabase/supabase-js'

export const URL_ENDPOINT = 'https://imfyjivxdtxrocpnjeee.supabase.co'
export const PUBLIC_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltZnlqaXZ4ZHR4cm9jcG5qZWVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzkwNDMxMTgsImV4cCI6MTk5NDYxOTExOH0.LysFb6E0ZG2pbYhT4H4otx-6zZGee3Ut0ph1nX2iELE'

export const supabase = createClient(URL_ENDPOINT, PUBLIC_KEY)
