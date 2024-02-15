import React, { useState, useEffect } from 'react';
import axiosApi from '../../../axiosApi';
import PageEditorForm from '../AdminForm/AdminForm';

interface Page {
  title: string;
  content: string;
}

const AdminPage: React.FC = () => {
  const [pages, setPages] = useState<string[]>([]);
  const [selectedPage, setSelectedPage] = useState<string>('');
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await axiosApi.get<Record<string, Page>>('/pages.json');
        setPages(Object.keys(response.data));
      } catch (error) {
        console.error(error);
      }
    };
    fetchPages();
  }, []);

  const handlePageChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const pageName = event.target.value;
    setSelectedPage(pageName);
    try {
      const response = await axiosApi.get<Page>(`/pages/${pageName}.json`);
      setContent(response.data.content);
    } catch (error) {
      console.error('Error fetching page content:', error);
    }
  };

  const handleSave = async () => {
    try {
      await axiosApi.put(`/pages/${selectedPage}.json`, { content });
      console.log('Content saved successfully!');
    } catch (error) {
      console.error('Error saving content:', error);
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <label htmlFor="page-select">Select a Page:</label>
      <select id="page-select" value={selectedPage} onChange={handlePageChange}>
        <option value="">Select a page...</option>
        {pages.map((page) => (
          <option key={page} value={page}>
            {page}
          </option>
        ))}
      </select>
      {selectedPage && (
        <PageEditorForm content={content} setContent={setContent} onSave={handleSave} />
      )}
    </div>
  );
};

export default AdminPage;
