import { useState, useEffect } from "react";

export default function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await fetch(
        "https://newsapi.org/v2/top-headlines?country=us&apiKey=YOUR_API_KEY"
      );
      const data = await response.json();
      setNews(data.articles);
    };

    fetchNews();
  }, []);

  return (
    <div className="news-container">
      {news.map((article) => (
        <div key={article.url} className="news-article">
          <h3>{article.title}</h3>
          <p>{article.description}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            Read more
          </a>
        </div>
      ))}
    </div>
  );
}
