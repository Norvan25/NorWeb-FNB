import { useNovaChat } from '../../context/NovaChatContext';

export function NovaFloatingButton() {
  const { openChat } = useNovaChat();

  return (
    <button className="nova-floating-btn" onClick={openChat}>
      <span className="nova-floating-icon">🎤</span>
      <span className="nova-floating-text">Talk to Nova</span>
    </button>
  );
}
