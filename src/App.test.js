import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders Steven’s portfolio introduction', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1, name: /steven lo cen/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /view selected work/i })).toBeInTheDocument();
  expect(screen.getByText(/carnegie mellon university/i)).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 2, name: /education/i })).toBeInTheDocument();
  expect(screen.queryByText(/Degrees and global study/i)).not.toBeInTheDocument();
  expect(screen.getAllByText(/study away/i)).toHaveLength(2);
  expect(screen.queryByText(/^Shanghai and Hanoi$/i)).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: /shanghai/i })).toBeInTheDocument();
  expect(screen.getByText(/Conscious: Better Spending App/i)).toBeInTheDocument();
  expect(screen.getByText(/Co-Founder & Developer · May 2026 — Present/i)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /open Conscious: Better Spending App/i })).toHaveAttribute('href', 'https://apps.apple.com/us/app/conscious-better-spending/id6778949105');
  expect(screen.getByText(/Urban Mobility & Emissions Digital Twin/i)).toBeInTheDocument();
  expect(screen.getByText(/Simulation & Policy Analyst · Jan 2026/i)).toBeInTheDocument();
  expect(screen.getByText(/Best Presentation award/i)).toBeInTheDocument();
  expect(screen.getByText(/Software Engineer · Sep — Dec 2025/i)).toBeInTheDocument();
  expect(screen.getByText(/Project Manager & Software Engineer · Jan — Dec 2025/i)).toBeInTheDocument();
  expect(screen.getByText(/student operations attendant/i)).toBeInTheDocument();
  expect(screen.getByText(/CSE Peer Mentor/i)).toBeInTheDocument();
  expect(screen.getByText(/CSE Leadership Award/i)).toBeInTheDocument();
  expect(screen.getByText(/NYU Theta Tau/i)).toBeInTheDocument();
  expect(screen.getByText(/Chinese Mei Society/i)).toBeInTheDocument();
  expect(screen.getByText(/SHPE/i)).toBeInTheDocument();
  expect(screen.getByText(/HackNYU/i)).toBeInTheDocument();
  expect(screen.getByText(/Tech@NYU/i)).toBeInTheDocument();
  expect(screen.queryByRole('img', { name: /NYU Tandon School of Engineering logo/i })).not.toBeInTheDocument();
  expect(screen.getByText(/software engineer · ai · data · cloud/i)).toBeInTheDocument();
  expect(screen.queryByText(/software engineer · ai · data · cloud · cmu/i)).not.toBeInTheDocument();
  expect(screen.getByRole('link', { name: /resume/i })).toHaveAttribute('href', '/assets/resume/steven_locen_resume_gs.pdf');
  expect(screen.getByRole('link', { name: /resume/i })).toHaveAttribute('target', '_blank');
  expect(screen.getByRole('link', { name: /experience/i })).toHaveAttribute('href', '#experience');
  expect(screen.getByRole('link', { name: /photography/i })).toHaveAttribute('href', 'https://www.instagram.com/stevloc.frames/');
  expect(screen.getByRole('link', { name: /strava/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /beli/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /top 1% of coffee and tea reviewers/i })).toHaveAttribute('href', 'https://beliapp.co/app/stevloc2');
  expect(screen.getByRole('link', { name: /photographing landscapes/i })).toHaveAttribute('href', 'https://www.instagram.com/stevloc.frames/');
  expect(screen.getByRole('link', { name: /connect with me/i })).toHaveAttribute('href', 'mailto:stevloc03@gmail.com');
  expect(screen.getByText(/open to new ideas, collaborations, and opportunities/i)).toBeInTheDocument();
});

test('reveals the complete project collection', () => {
  render(<App />);
  expect(screen.queryByText(/brass bets/i)).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /view all 13 projects/i }));

  expect(screen.getByText(/brass bets/i)).toBeInTheDocument();
  expect(screen.getByText(/Indie Game Developer · 2023 — Present/i)).toBeInTheDocument();
  expect(screen.getByText(/Product Designer · Sep — Dec 2022/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /show selected projects/i })).toHaveAttribute('aria-expanded', 'true');
});
