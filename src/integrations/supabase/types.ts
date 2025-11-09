export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      appointments: {
        Row: {
          call_log_id: string | null
          confirmation_sent: boolean | null
          created_at: string | null
          customer_email: string
          customer_name: string
          customer_phone: string | null
          date: string
          duration_minutes: number | null
          google_calendar_event_id: string | null
          id: string
          notes: string | null
          price: number | null
          service: string
          status: string | null
          time: string
          updated_at: string | null
        }
        Insert: {
          call_log_id?: string | null
          confirmation_sent?: boolean | null
          created_at?: string | null
          customer_email: string
          customer_name: string
          customer_phone?: string | null
          date: string
          duration_minutes?: number | null
          google_calendar_event_id?: string | null
          id?: string
          notes?: string | null
          price?: number | null
          service: string
          status?: string | null
          time: string
          updated_at?: string | null
        }
        Update: {
          call_log_id?: string | null
          confirmation_sent?: boolean | null
          created_at?: string | null
          customer_email?: string
          customer_name?: string
          customer_phone?: string | null
          date?: string
          duration_minutes?: number | null
          google_calendar_event_id?: string | null
          id?: string
          notes?: string | null
          price?: number | null
          service?: string
          status?: string | null
          time?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appointments_call_log_id_fkey"
            columns: ["call_log_id"]
            isOneToOne: false
            referencedRelation: "call_logs"
            referencedColumns: ["id"]
          },
        ]
      }
      business_config: {
        Row: {
          ai_instructions: string | null
          booking_buffer_minutes: number | null
          business_hours: Json | null
          business_name: string | null
          business_type: string | null
          confirmation_template: string | null
          created_at: string | null
          google_calendar_id: string | null
          google_calendar_refresh_token: string | null
          id: string
          owner_notification_email: string | null
          retell_agent_id: string | null
          retell_phone_number: string | null
          services: Json | null
          updated_at: string | null
        }
        Insert: {
          ai_instructions?: string | null
          booking_buffer_minutes?: number | null
          business_hours?: Json | null
          business_name?: string | null
          business_type?: string | null
          confirmation_template?: string | null
          created_at?: string | null
          google_calendar_id?: string | null
          google_calendar_refresh_token?: string | null
          id?: string
          owner_notification_email?: string | null
          retell_agent_id?: string | null
          retell_phone_number?: string | null
          services?: Json | null
          updated_at?: string | null
        }
        Update: {
          ai_instructions?: string | null
          booking_buffer_minutes?: number | null
          business_hours?: Json | null
          business_name?: string | null
          business_type?: string | null
          confirmation_template?: string | null
          created_at?: string | null
          google_calendar_id?: string | null
          google_calendar_refresh_token?: string | null
          id?: string
          owner_notification_email?: string | null
          retell_agent_id?: string | null
          retell_phone_number?: string | null
          services?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      call_logs: {
        Row: {
          appointment_id: string | null
          created_at: string | null
          customer_email: string | null
          customer_name: string | null
          customer_phone: string | null
          duration_seconds: number | null
          ended_at: string | null
          id: string
          metadata: Json | null
          outcome: string | null
          retell_call_id: string | null
          started_at: string | null
          transcript: Json | null
        }
        Insert: {
          appointment_id?: string | null
          created_at?: string | null
          customer_email?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          duration_seconds?: number | null
          ended_at?: string | null
          id?: string
          metadata?: Json | null
          outcome?: string | null
          retell_call_id?: string | null
          started_at?: string | null
          transcript?: Json | null
        }
        Update: {
          appointment_id?: string | null
          created_at?: string | null
          customer_email?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          duration_seconds?: number | null
          ended_at?: string | null
          id?: string
          metadata?: Json | null
          outcome?: string | null
          retell_call_id?: string | null
          started_at?: string | null
          transcript?: Json | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
