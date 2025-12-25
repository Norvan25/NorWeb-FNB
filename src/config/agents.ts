// Agent configuration for voice HUD routing
// Each route maps to a specific ElevenLabs agent

export interface AgentConfig {
  agentId: string;
  agentName: string;
  agentRole: string;
  themeColor: string;
  secondaryColor: string;
}

export const AGENT_CONFIG: Record<string, AgentConfig> = {
  '/': {
    agentId: import.meta.env.VITE_ELEVENLABS_HUB_AGENT_ID || '',
    agentName: 'Nova',
    agentRole: 'NorWeb Sales Guide',
    themeColor: '#66D3FA',
    secondaryColor: '#007ACC',
  },
  '/restaurant/gusto': {
    agentId: import.meta.env.VITE_ELEVENLABS_GUSTO_AGENT_ID || '',
    agentName: 'Marco',
    agentRole: 'Gusto Italiano',
    themeColor: '#CA8A04',
    secondaryColor: '#A16207',
  },
  '/restaurant/veda': {
    agentId: import.meta.env.VITE_ELEVENLABS_VEDA_AGENT_ID || '',
    agentName: 'Dev',
    agentRole: 'Veda Kitchen',
    themeColor: '#EA580C',
    secondaryColor: '#C2410C',
  },
  '/restaurant/rimba': {
    agentId: import.meta.env.VITE_ELEVENLABS_RIMBA_AGENT_ID || '',
    agentName: 'Aiman',
    agentRole: 'Rimba Kitchen',
    themeColor: '#10B981',
    secondaryColor: '#059669',
  },
  '/restaurant/rouge': {
    agentId: import.meta.env.VITE_ELEVENLABS_ROUGE_AGENT_ID || '',
    agentName: 'Rouge',
    agentRole: 'Rouge Fine Dining',
    themeColor: '#DC2626',
    secondaryColor: '#B91C1C',
  },
};

// Default agent when route not found
export const DEFAULT_AGENT = AGENT_CONFIG['/'];

// Get agent config for a given pathname
export function getAgentForPath(pathname: string): AgentConfig {
  // Exact match first
  if (AGENT_CONFIG[pathname]) {
    return AGENT_CONFIG[pathname];
  }
  
  // Try to match restaurant routes
  for (const [route, config] of Object.entries(AGENT_CONFIG)) {
    if (pathname.startsWith(route) && route !== '/') {
      return config;
    }
  }
  
  return DEFAULT_AGENT;
}

