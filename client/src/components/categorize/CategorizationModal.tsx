import { useState } from 'react';
import type { CategorizationSuggestion } from '../../types';

interface Props {
  suggestions: CategorizationSuggestion[];
  onApply: (suggestions: CategorizationSuggestion[]) => void;
  onClose: () => void;
}

export default function CategorizationModal({ suggestions: initialSuggestions, onApply, onClose }: Props) {
  const [suggestions, setSuggestions] = useState(initialSuggestions);

  const toggleApproval = (index: number) => {
    setSuggestions((prev) =>
      prev.map((s, i) => (i === index ? { ...s, approved: !s.approved } : s))
    );
  };

  const approvedCount = suggestions.filter((s) => s.approved).length;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>AI Category Suggestions</h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', marginBottom: '16px' }}>
          Review the suggested categories below. Uncheck any you want to skip.
        </p>
        {suggestions.map((suggestion, index) => (
          <div key={suggestion.id} className="suggestion-row">
            <input
              type="checkbox"
              checked={suggestion.approved}
              onChange={() => toggleApproval(index)}
            />
            <span className="description">{suggestion.description}</span>
            <span className="suggested-category">{suggestion.suggested_category}</span>
          </div>
        ))}
        <div className="modal-actions">
          <button className="btn btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={() => onApply(suggestions)}
            disabled={approvedCount === 0}
          >
            Apply {approvedCount} change{approvedCount !== 1 ? 's' : ''}
          </button>
        </div>
      </div>
    </div>
  );
}
