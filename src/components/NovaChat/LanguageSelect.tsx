interface Props {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'ms', label: 'Bahasa Melayu', flag: '🇲🇾' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
];

export function LanguageSelect({ value, onChange, disabled }: Props) {
  return (
    <div className="language-select-wrapper">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
        className="language-select"
      >
        {LANGUAGES.map(lang => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}
