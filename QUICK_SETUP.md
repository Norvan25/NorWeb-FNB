# Voice AI HUD - Quick Setup Guide

## 🚀 5-Minute Setup

### 1. Install Dependencies
```bash
npm install @elevenlabs/client framer-motion
```

### 2. Add Environment Variables
Create/update `.env`:
```env
VITE_ELEVENLABS_API_KEY=your_api_key_here
VITE_ELEVENLABS_HUB_AGENT_ID=your_agent_id_here
```

### 3. Copy Files
Copy these 3 files to your project:
- `CommunicationContext.tsx` → `src/context/`
- `CommunicationHUD.tsx` → `src/components/`
- Edge function folder → `supabase/functions/elevenlabs-auth/`

### 4. Wrap Your App
In `main.tsx` or `App.tsx`:
```tsx
import { CommunicationProvider } from './context/CommunicationContext';
import { CommunicationHUD } from './components/CommunicationHUD';

function App() {
  return (
    <CommunicationProvider>
      <YourContent />
      <CommunicationHUD />
    </CommunicationProvider>
  );
}
```

### 5. Add a Trigger Button
```tsx
import { useCommunication } from './context/CommunicationContext';

function MyComponent() {
  const { openHUD } = useCommunication();

  return (
    <button onClick={() => openHUD('HUB')}>
      Talk to AI
    </button>
  );
}
```

### 6. Deploy Edge Function
The edge function deploys automatically in Bolt.
Make sure `ELEVENLABS_API_KEY` is set in Supabase secrets.

---

## 🎨 Match Your Brand Theme

### Update Colors
In `CommunicationHUD.tsx`, find `AGENT_THEMES`:

```typescript
const AGENT_THEMES = {
  MAIN: {
    icon: YourIcon,          // ← Change icon
    primary: '#YOUR_COLOR',   // ← Your primary color
    secondary: '#YOUR_COLOR', // ← Your secondary color
    name: 'Your AI Name',     // ← Your agent name
    agentId: import.meta.env.VITE_ELEVENLABS_HUB_AGENT_ID,
  },
};
```

### Update Footer Branding
Find this line:
```typescript
Powered by Your Brand  // ← Change this
```

---

## 🎯 Common Integrations

### Floating Button (Bottom Right)
```tsx
<button
  onClick={() => openHUD('HUB')}
  className="fixed bottom-6 right-6 w-16 h-16 bg-blue-500 rounded-full shadow-2xl z-50"
>
  💬
</button>
```

### Navigation Bar
```tsx
<nav>
  <div>Logo</div>
  <button onClick={() => openHUD('HUB')}>
    Talk to AI
  </button>
</nav>
```

### Hero Section CTA
```tsx
<section>
  <h1>Welcome</h1>
  <button onClick={() => openHUD('HUB')}>
    Get Instant Answers
  </button>
</section>
```

### With Context (Recommended)
```tsx
// Product page
openHUD('HUB', 'CONTEXT: USER_VIEWING_PRODUCT_123')

// Support page
openHUD('HUB', 'CONTEXT: USER_NEEDS_SUPPORT')

// Checkout page
openHUD('HUB', 'CONTEXT: USER_IN_CHECKOUT')
```

---

## 🤖 ElevenLabs Setup

### Create an Agent
1. Go to https://elevenlabs.io
2. Sign up/login
3. Navigate to "Conversational AI"
4. Click "Create Agent"
5. Configure your agent's:
   - Voice
   - Personality/Instructions
   - Knowledge base
6. Copy the Agent ID
7. Add to `.env` as `VITE_ELEVENLABS_HUB_AGENT_ID`

### Get API Key
1. In ElevenLabs dashboard
2. Go to Profile → API Keys
3. Copy your API key
4. Add to `.env` as `VITE_ELEVENLABS_API_KEY`
5. Also add to Supabase:
   - Go to Supabase Dashboard
   - Project Settings → Edge Functions
   - Add Secret: `ELEVENLABS_API_KEY` = your_key

---

## 🔧 Advanced: Multiple Agents

### 1. Create Multiple Agents in ElevenLabs
- Sales Agent
- Support Agent
- Booking Agent

### 2. Add Agent IDs to `.env`
```env
VITE_ELEVENLABS_SALES_AGENT_ID=agent_xxx
VITE_ELEVENLABS_SUPPORT_AGENT_ID=agent_yyy
VITE_ELEVENLABS_BOOKING_AGENT_ID=agent_zzz
```

### 3. Update `AGENT_THEMES` in Component
```typescript
const AGENT_THEMES = {
  SALES: {
    icon: DollarSign,
    primary: '#10B981',
    secondary: '#059669',
    name: 'Sales Agent',
    agentId: import.meta.env.VITE_ELEVENLABS_SALES_AGENT_ID,
  },
  SUPPORT: {
    icon: Headphones,
    primary: '#3B82F6',
    secondary: '#2563EB',
    name: 'Support Agent',
    agentId: import.meta.env.VITE_ELEVENLABS_SUPPORT_AGENT_ID,
  },
};
```

### 4. Trigger Different Agents
```tsx
// Sales
openHUD('RESTAURANT', 'CONTEXT: SALES', 'SALES')

// Support
openHUD('RESTAURANT', 'CONTEXT: SUPPORT', 'SUPPORT')
```

---

## 🌍 Language Support

The HUD includes a language selector. Supported languages:

```typescript
<option value="en">🇺🇸 English</option>
<option value="es">🇪🇸 Spanish</option>
<option value="fr">🇫🇷 French</option>
<option value="de">🇩🇪 German</option>
<option value="it">🇮🇹 Italian</option>
<option value="pt">🇵🇹 Portuguese</option>
<option value="zh">🇨🇳 Chinese</option>
<option value="ja">🇯🇵 Japanese</option>
<option value="ko">🇰🇷 Korean</option>
```

Users can switch languages before starting a conversation.

---

## 📱 Mobile Optimization

The HUD is fully responsive:
- Adapts to screen size
- Touch-friendly buttons
- Optimized text input
- Proper z-index layering

Test on:
- iPhone (Safari)
- Android (Chrome)
- Tablet devices

---

## 🐛 Troubleshooting

### "Failed to get signed URL"
- Check `ELEVENLABS_API_KEY` in Supabase secrets
- Verify agent ID is correct
- Check edge function is deployed

### "Microphone permission denied"
- Browser blocked microphone access
- Ask user to allow permissions
- Try HTTPS (required for mic access)

### No audio from agent
- Check device volume
- Test with headphones
- Verify agent has voice configured in ElevenLabs

### Wrong agent responding
- Check you're passing correct agent ID
- Verify environment variables are loaded
- Check `AGENT_THEMES` configuration

### Build errors
- Ensure all dependencies installed
- Check TypeScript types
- Verify imports are correct

---

## 📊 Usage Analytics (Optional)

Track HUD usage:

```typescript
const { openHUD } = useCommunication();

const trackAndOpen = () => {
  // Your analytics code
  analytics.track('AI_HUD_Opened', {
    page: window.location.pathname,
    timestamp: Date.now()
  });

  openHUD('HUB');
};
```

---

## ✅ Final Checklist

- [ ] Dependencies installed
- [ ] Environment variables set
- [ ] Files copied to project
- [ ] App wrapped with Provider
- [ ] HUD component added
- [ ] Trigger button added
- [ ] Edge function deployed
- [ ] ElevenLabs agent created
- [ ] API key added to Supabase
- [ ] Theme colors customized
- [ ] Branding updated
- [ ] Tested on desktop
- [ ] Tested on mobile
- [ ] Tested voice call
- [ ] Tested text chat

---

## 🎓 Next Steps

1. **Customize Agent Personality**
   - Go to ElevenLabs dashboard
   - Update agent instructions
   - Add knowledge base documents

2. **Style Customization**
   - Update colors to match brand
   - Modify button styles
   - Adjust animations

3. **Add Context Intelligence**
   - Pass page context to agent
   - Include user data (when appropriate)
   - Track conversation topics

4. **Monitor Usage**
   - Check ElevenLabs dashboard for analytics
   - Monitor conversation quality
   - Collect user feedback

---

## 📚 Resources

- [ElevenLabs Documentation](https://elevenlabs.io/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com)
- Full examples in `HUD_USAGE_EXAMPLES.tsx`

---

**Need Help?**

Check the full integration guide in `HUD_INTEGRATION_GUIDE.md` for detailed explanations and advanced configurations.
