'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestConnection() {
  const [skills, setSkills] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data, error } = await supabase
          .from('skills')
          .select('*')
          .limit(5)
        
        if (error) {
          setError(error.message)
        } else {
          setSkills(data || [])
        }
      } catch (err) {
        setError('Failed to connect to database')
      } finally {
        setLoading(false)
      }
    }
    
    fetchSkills()
  }, [])
  
  if (loading) return <div className="p-4">Loading...</div>
  
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>
  
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Database Connection Test</h2>
      {skills.length > 0 ? (
        <div>
          <p className="text-green-600 mb-2">✅ Successfully connected to Supabase!</p>
          <ul className="space-y-2">
            {skills.map((skill: any) => (
              <li key={skill.id} className="bg-gray-100 p-2 rounded">
                <strong>{skill.name}</strong> - {skill.category}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-yellow-600">Connected but no skills found. Make sure to run the seed data SQL.</p>
      )}
    </div>
  )
}