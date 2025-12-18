# Voice AI HUD Integration Guide

This guide will help you integrate the Voice AI HUD (Nova Agent System) into any Bolt project.

## 📦 Required Dependencies

```bash
npm install @elevenlabs/client@^0.12.2 framer-motion@^12.23.24
```

## 🔧 Environment Variables

Add these to your `.env` file:

```env
# Supabase (already configured in Bolt)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# ElevenLabs API Key (get from https://elevenlabs.io)
VITE_ELEVENLABS_API_KEY=your_elevenlabs_api_key

# ElevenLabs Agent IDs (create agents at https://elevenlabs.io)
VITE_ELEVENLABS_HUB_AGENT_ID=your_main_agent_id
# Add more agent IDs as needed for different contexts
```

## 📁 File Structure

```
src/
├── context/
│   └── CommunicationContext.tsx
├── components/
│   └── CommunicationHUD.tsx
└── main.tsx (or App.tsx)

supabase/
└── functions/
    └── elevenlabs-auth/
        └── index.ts
```

## 🔌 Setup Steps

### Step 1: Create the Context Provider

Create `src/context/CommunicationContext.tsx`:

```typescript
import { createContext, useContext, useState, ReactNode } from 'react';

export type CommunicationMode = 'HUB' | 'RESTAURANT';
export type RestaurantName = 'RIMBA' | 'ROUGE' | 'VEDA' | 'GUSTO';

interface CommunicationContextType {
  isOpen: boolean;
  mode: CommunicationMode;
  activeContext: string | null;
  activeRestaurant: RestaurantName | null;
  openHUD: (mode: CommunicationMode, context?: string, restaurant?: RestaurantName) => void;
  closeHUD: () => void;
  switchMode: (mode: CommunicationMode, context?: string, restaurant?: RestaurantName) => void;
}

const CommunicationContext = createContext<CommunicationContextType | undefined>(undefined);

export const CommunicationProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<CommunicationMode>('HUB');
  const [activeContext, setActiveContext] = useState<string | null>(null);
  const [activeRestaurant, setActiveRestaurant] = useState<RestaurantName | null>(null);

  const openHUD = (newMode: CommunicationMode, context?: string, restaurant?: RestaurantName) => {
    if (isOpen) return;
    setMode(newMode);
    setActiveContext(context || null);
    setActiveRestaurant(restaurant || null);
    setIsOpen(true);
  };

  const closeHUD = () => {
    setIsOpen(false);
    setTimeout(() => {
      setMode('HUB');
      setActiveContext(null);
      setActiveRestaurant(null);
    }, 300);
  };

  const switchMode = (newMode: CommunicationMode, context?: string, restaurant?: RestaurantName) => {
    setMode(newMode);
    setActiveContext(context || null);
    setActiveRestaurant(restaurant || null);
  };

  return (
    <CommunicationContext.Provider
      value={{
        isOpen,
        mode,
        activeContext,
        activeRestaurant,
        openHUD,
        closeHUD,
        switchMode,
      }}
    >
      {children}
    </CommunicationContext.Provider>
  );
};

export const useCommunication = () => {
  const context = useContext(CommunicationContext);
  if (context === undefined) {
    throw new Error('useCommunication must be used within a CommunicationProvider');
  }
  return context;
};
```

### Step 2: Wrap Your App with the Provider

In your `src/main.tsx` or `src/App.tsx`:

```typescript
import { CommunicationProvider } from './context/CommunicationContext';
import { CommunicationHUD } from './components/CommunicationHUD';

function App() {
  return (
    <CommunicationProvider>
      {/* Your app content */}
      <CommunicationHUD />
    </CommunicationProvider>
  );
}
```

### Step 3: Create the Edge Function

Create `supabase/functions/elevenlabs-auth/index.ts`:

```typescript
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const url = new URL(req.url);
    const agentId = url.searchParams.get("agent_id");

    if (!agentId) {
      throw new Error("agent_id parameter is required");
    }

    const elevenLabsApiKey = Deno.env.get("ELEVENLABS_API_KEY");

    if (!elevenLabsApiKey) {
      throw new Error("ELEVENLABS_API_KEY not configured");
    }

    const response = await fetch(
      \`https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=\${agentId}\`,
      {
        method: "GET",
        headers: {
          "xi-api-key": elevenLabsApiKey,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("ElevenLabs API error:", errorText);
      throw new Error(\`ElevenLabs API error: \${response.status} - \${errorText}\`);
    }

    const data = await response.json();

    return new Response(
      JSON.stringify({ signedUrl: data.signed_url }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Failed to generate signed URL"
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
```

### Step 4: Deploy the Edge Function

In Bolt, the edge function will be automatically deployed. Make sure to add your ElevenLabs API key to Supabase secrets:

```bash
# This is done automatically in Bolt
# In Supabase Dashboard: Project Settings > Edge Functions > Add Secret
# Name: ELEVENLABS_API_KEY
# Value: your_api_key
```

### Step 5: Create the HUD Component

Create `src/components/CommunicationHUD.tsx` - See the full component code below.

## 🎨 Customization Guide

### Theme Configuration

The HUD uses a `RESTAURANT_THEMES` object that you can customize for your project:

```typescript
const YOUR_THEMES = {
  MAIN: {
    icon: YourIcon,           // Lucide React icon
    primary: '#00D4AA',       // Primary color
    secondary: '#00A888',     // Secondary color
    name: 'Your Agent Name',
    agentId: import.meta.env.VITE_ELEVENLABS_YOUR_AGENT_ID,
  },
  // Add more themes as needed
};
```

### Trigger the HUD

From any component:

```typescript
import { useCommunication } from '../context/CommunicationContext';

function YourComponent() {
  const { openHUD } = useCommunication();

  return (
    <button onClick={() => openHUD('HUB')}>
      Talk to AI
    </button>
  );
}
```

### Multiple Agents Example

```typescript
// Open with specific agent
openHUD('RESTAURANT', 'CONTEXT: USER_SELECTED_VEDA', 'VEDA');

// Open main hub agent
openHUD('HUB');
```

## 🎯 Language Support

The HUD supports multiple languages. Add/modify in the language selector:

```typescript
<select value={language} onChange={e => setLanguage(e.target.value)}>
  <option value="en">🇺🇸 English</option>
  <option value="es">🇪🇸 Spanish</option>
  <option value="fr">🇫🇷 French</option>
  {/* Add more languages */}
</select>
```

## 🔐 Security Notes

1. The edge function handles API key security
2. All ElevenLabs API calls go through your Supabase backend
3. Never expose your ElevenLabs API key in frontend code
4. The signed URL approach ensures secure real-time communication

## 🎨 Styling Tips

The HUD uses:
- **TailwindCSS** for utility classes
- **Framer Motion** for animations
- **Canvas API** for the animated orb
- **Inline styles** for dynamic theme colors

To match your project's theme:
1. Update the `themeColor` variable
2. Modify the gradient backgrounds
3. Adjust border colors and shadows
4. Customize the orb colors in the `NovaOrb` component

## 🐛 Troubleshooting

### Issue: "Failed to get signed URL"
- Check that ELEVENLABS_API_KEY is set in Supabase secrets
- Verify the agent ID is correct

### Issue: "Conversation not ready"
- Ensure microphone permissions are granted
- Check browser console for WebSocket errors

### Issue: Wrong agent responding
- Verify you're passing the correct agent ID
- Check environment variables are loaded

## 📝 Complete Component Code

The full `CommunicationHUD.tsx` component is attached separately (see next file).

## 🚀 Quick Start Checklist

- [ ] Install dependencies (`@elevenlabs/client`, `framer-motion`)
- [ ] Add environment variables to `.env`
- [ ] Create CommunicationContext
- [ ] Create CommunicationHUD component
- [ ] Wrap app with CommunicationProvider
- [ ] Add CommunicationHUD to your app
- [ ] Create and deploy edge function
- [ ] Set ELEVENLABS_API_KEY in Supabase
- [ ] Create agents in ElevenLabs dashboard
- [ ] Test voice connection

---

Built with ❤️ for Bolt.new projects
