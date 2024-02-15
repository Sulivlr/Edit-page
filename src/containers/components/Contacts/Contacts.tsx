import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {ApiPage} from '../../../types';
import axiosApi from '../../../axiosApi';
import Spinner from '../Spinner/Spinner';

const Contacts:React.FC = () => {
  const params = useParams<{contacts: string}>();

  const [contacts, setContacts] = useState<ApiPage | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchAbout = useCallback(async () => {
    setLoading(true);
    const response = await axiosApi.get<ApiPage | null>('/pages/' + params.contacts + '.json');
    setLoading(false);
    setContacts(response.data);
  }, [params.contacts]);

  useEffect(() => {
    void fetchAbout();
  }, [fetchAbout]);

  let area = <Spinner/>;

  if (!loading && contacts) {
    area = (
      <div>
        <h1>{contacts.title}</h1>
        <article>{contacts.content}</article>
      </div>
    );
  } else if (!loading && !contacts) {
    area = (
      <h1>Not Found!</h1>
    );
  }

  return area;
};

export default Contacts;