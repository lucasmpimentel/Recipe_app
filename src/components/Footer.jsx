import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/drinks" data-testid="drinks-bottom-btn" />
      <Link to="/explore" data-testid="explore-bottom-btn" />
      <Link to="/foods" data-testid="food-bottom-btn" />
    </footer>
  );
}
