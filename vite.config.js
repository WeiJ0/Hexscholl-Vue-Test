import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: 'https://weij0.github.io/Hexschool-Vue-Test/',
  define: {
    'process.env': {
      SUPABASE_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZydnliYXNobXF6bW5pdHl2Y2t5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzA1OTQ0NTEsImV4cCI6MTk4NjE3MDQ1MX0.oLJGyqjiw9gssNHBiPBpmu_bC-GH6S7ap03LDQ638FM'
    }
  },
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin.html'),
        signIn: resolve(__dirname, 'signIn.html'),
        signUp: resolve(__dirname, 'signUp.html'),
        view: resolve(__dirname, 'view.html'),
        editView: resolve(__dirname, 'editView.html'),
        collect: resolve(__dirname, 'collect.html')
      }
    }
  }
})