import { defineConfig } from 'vite'

export default defineConfig({
  // ...
  define: {
    'process.env': {
        SUPABASE_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZydnliYXNobXF6bW5pdHl2Y2t5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzA1OTQ0NTEsImV4cCI6MTk4NjE3MDQ1MX0.oLJGyqjiw9gssNHBiPBpmu_bC-GH6S7ap03LDQ638FM'
    }
  }
})