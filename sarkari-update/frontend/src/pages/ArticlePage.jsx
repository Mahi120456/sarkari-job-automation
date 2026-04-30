import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

    </article>
  );
}

export default ArticlePage;
