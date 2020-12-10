import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import calculatorForFerryCost from './calculator';

test('renders default UI elements', () => {
  render(<App />);

  const title = screen.getByText('Corn Trip Cost Calculator');
  const input = screen.getByPlaceholderText('Number of bags of corn');
  const image = screen.getByRole('img');
  const button = screen.getByRole('button');

  expect(title).toBeInTheDocument;
  expect(input).toBeInTheDocument;

  expect(image).toBeInTheDocument;
  expect(image).toHaveAttribute('src', './corn.png');

  expect(button).toBeInTheDocument;
  expect(button.textContent).toEqual('Calculate');
});

test('on button click, renders hidden elements', () => {
  render(<App calculate={calculatorForFerryCost(0.25)} />);

  fireEvent.change(screen.getByPlaceholderText("Number of bags of corn"), {
    target: { value: "3" }
  });
  fireEvent.click(screen.getByRole('button'));

  const willTake = screen.getByText('Will take');
  const costOf = screen.getByText('At a cost of');
  const input = screen.getAllByRole('textbox');

  expect(willTake).toBeInTheDocument;
  expect(costOf).toBeInTheDocument;
  
  expect(input[0].value).toEqual('5 ferry trips');
  expect(input[1].value).toEqual('£1.25');
});