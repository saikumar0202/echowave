import * as React from 'react';
import './styles.scss';

interface SectionProps {
  title: React.ReactNode,
  subtitle?: React.ReactNode,
  action?: React.ReactNode,
  children: React.ReactNode,
}

export const Section = ({ title, subtitle, action, children }: SectionProps) => (
  <section className='section'>
    <header className='section__header'>
      <div className='section__titles'>
        {subtitle && <p className='section__subtitle'>{subtitle}</p>}
        <h2 className='section__title'>{title}</h2>
      </div>
      {action}
    </header>
    {children}
  </section>
);

export const PlayAllButton = ({ onClick, label = 'Play all' }: { onClick: () => void, label?: string }) => (
  <button className='play-all' onClick={onClick}>
    <i className='fa-solid fa-play' /> {label}
  </button>
);
