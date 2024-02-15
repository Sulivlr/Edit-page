import {useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {ApiPage} from '../../../types';
import axiosApi from '../../../axiosApi';
import Spinner from '../Spinner/Spinner';


const About = () => {
  const params = useParams<{about: string}>();

  const [about, setAbout] = useState<ApiPage | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchAbout = useCallback(async () => {
    setLoading(true);
    const response = await axiosApi.get<ApiPage | null>('/pages/' + params.about + '.json');
    setLoading(false);
    setAbout(response.data);
  }, [params.about]);

  useEffect(() => {
    void fetchAbout();
  }, [fetchAbout]);

  let area = <Spinner/>;

  if (!loading && about) {
    area = (
      <div>
        <h1>{about.title}</h1>
        <article>{about.content}</article>
      </div>
    );
  } else if (!loading && !about) {
    area = (
      <h1>Not Found!</h1>
    );
  }

  return area;
};

export default About;