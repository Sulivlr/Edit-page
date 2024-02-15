import React, {useCallback, useEffect, useState} from 'react';
import {ApiPages, Page} from '../../../types';
import axiosApi from '../../../axiosApi';
import {Link,} from 'react-router-dom';

const Home:React.FC = () => {
  const [about, setAbout] = useState<Page[]>([]);

  const fetchAbouts = useCallback(async () => {
    const response = await axiosApi.get<ApiPages | null>('/pages.json');
    const about = response.data;

    if (about) {
      setAbout(Object.keys(about).map(id => ({
        ...about[id],
        id,
      })));
    } else {
      setAbout([]);
    }
  }, []);

  useEffect(() => {
    void fetchAbouts();
  }, [fetchAbouts]);

  return (
    <div className="mt-3 d-flex flex-column gap-3">
      {about.map(abouts => (
        <div key={abouts.id} className="card">
          <div className="card-body">
            <h6>{abouts.title}</h6>
            <Link className="btn btn-primary" to={'/about/' + abouts.id}>About</Link>
            <Link className="btn btn-success" to={'/admin/' + abouts.id}>Edit Page</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;