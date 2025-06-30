import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Database } from '@/lib/supabase'

type TradePost = Database['public']['Tables']['trade_posts']['Row']
type Message = Database['public']['Tables']['messages']['Row']
type UserProfile = Database['public']['Tables']['user_profiles']['Row']

// Hook for real-time trade posts
export const useTradePostsRealtime = () => {
  const [tradePosts, setTradePosts] = useState<TradePost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTradePosts = async () => {
      const { data, error } = await supabase
        .from('trade_posts')
        .select(`
          *,
          user_profiles!user_id(*),
          skill_offered:skills!skill_offered_id(*),
          skill_wanted:skills!skill_wanted_id(*)
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false })

      if (data) setTradePosts(data as any)
      setLoading(false)
    }

    fetchTradePosts()

    // Subscribe to real-time changes
    const subscription = supabase
      .channel('trade_posts_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'trade_posts' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setTradePosts(prev => [payload.new as TradePost, ...prev])
          } else if (payload.eventType === 'UPDATE') {
            setTradePosts(prev => 
              prev.map(post => 
                post.id === payload.new.id ? payload.new as TradePost : post
              )
            )
          } else if (payload.eventType === 'DELETE') {
            setTradePosts(prev => 
              prev.filter(post => post.id !== payload.old.id)
            )
          }
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return { tradePosts, loading }
}

// Hook for real-time messages
export const useMessagesRealtime = (tradeRequestId: string) => {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    if (!tradeRequestId) return

    const fetchMessages = async () => {
      const { data } = await supabase
        .from('messages')
        .select(`
          *,
          sender:user_profiles!sender_id(*)
        `)
        .eq('trade_request_id', tradeRequestId)
        .order('created_at', { ascending: true })

      if (data) setMessages(data as any)
    }

    fetchMessages()

    const subscription = supabase
      .channel(`messages_${tradeRequestId}`)
      .on('postgres_changes',
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'messages',
          filter: `trade_request_id=eq.${tradeRequestId}`
        },
        (payload) => {
          setMessages(prev => [...prev, payload.new as Message])
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [tradeRequestId])

  return { messages, setMessages }
}

// Hook for user authentication
export const useAuth = () => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  return { user, loading }
}