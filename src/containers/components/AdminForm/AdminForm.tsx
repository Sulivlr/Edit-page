import React from 'react';

interface Props {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  onSave: () => void;
}

const AdminForm: React.FC<Props> = ({ content, setContent, onSave }) => {
  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="content">Content:</label>
      <textarea id="content" value={content} onChange={handleContentChange} />
      <button type="submit">Save</button>
    </form>
  );
};

export default AdminForm;
