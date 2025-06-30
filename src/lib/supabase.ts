import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ytymxjpppugaexxevyij.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0eW14anBwcHVnYWV4eGV2eWlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMjE4OTQsImV4cCI6MjA2NjY5Nzg5NH0.vu-dU8_MKpt-jDxwANw9WUq-uDzzHcu86t32AULOCFw'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          username: string
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          location: string | null
          skills: any | null
          rating: number
          total_trades: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          location?: string | null
          skills?: any | null
          rating?: number
          total_trades?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          location?: string | null
          skills?: any | null
          rating?: number
          total_trades?: number
          created_at?: string
          updated_at?: string
        }
      }
      trade_posts: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          skill_offered_id: string
          skill_wanted_id: string
          status: string
          location: string | null
          trade_type: string
          duration_hours: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          skill_offered_id: string
          skill_wanted_id: string
          status?: string
          location?: string | null
          trade_type?: string
          duration_hours?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          skill_offered_id?: string
          skill_wanted_id?: string
          status?: string
          location?: string | null
          trade_type?: string
          duration_hours?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      skills: {
        Row: {
          id: string
          name: string
          category: string | null
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          category?: string | null
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: string | null
          description?: string | null
          created_at?: string
        }
      }
      trade_requests: {
        Row: {
          id: string
          post_id: string
          requester_id: string
          message: string | null
          status: string
          proposed_time: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          post_id: string
          requester_id: string
          message?: string | null
          status?: string
          proposed_time?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          requester_id?: string
          message?: string | null
          status?: string
          proposed_time?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          trade_request_id: string
          sender_id: string
          content: string
          message_type: string
          read_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          trade_request_id: string
          sender_id: string
          content: string
          message_type?: string
          read_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          trade_request_id?: string
          sender_id?: string
          content?: string
          message_type?: string
          read_at?: string | null
          created_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          trade_request_id: string
          reviewer_id: string
          reviewee_id: string
          rating: number
          comment: string | null
          created_at: string
        }
        Insert: {
          id?: string
          trade_request_id: string
          reviewer_id: string
          reviewee_id: string
          rating: number
          comment?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          trade_request_id?: string
          reviewer_id?: string
          reviewee_id?: string
          rating?: number
          comment?: string | null
          created_at?: string
        }
      }
    }
  }
}