import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import calculatorForFerryCost from './calculator';

test('renders default UI elements', () => {
  render(<App />);

  const title = screen.getByText('Corn & Geese Trip Calculator');
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

// Actually an integration test, might mock out calls at some point
test('on button click, shows result', () => {
  render(<App calculate={calculatorForFerryCost(0.25)} />);

  fireEvent.change(screen.getByPlaceholderText("Number of bags of corn"), {
    target: { value: "3" }
  });
  fireEvent.click(screen.getByRole('button'));

  const willTake = screen.getByText('Will take');
  const costOf = screen.getByText('At a cost of');
  const input = screen.getAllByRole('textbox');
  const instructionsTitle = screen.getByText('Trip instructions');
  const instructions = screen.getAllByRole('listitem');

  expect(willTake).toBeInTheDocument;
  expect(costOf).toBeInTheDocument;
  expect(instructionsTitle).toBeInTheDocument;

  expect(input[0].value).toEqual('5 ferry trips');
  expect(input[1].value).toEqual('£1.25');

  expect(instructions[0].textContent).toEqual('Carry a goose to the market shore');
  expect(instructions[1].textContent).toEqual('Carry nothing back home');
  expect(instructions[2].textContent).toEqual('Carry a sack of corn to the market shore');
  expect(instructions[3].textContent).toEqual('Carry a goose back home');
  expect(instructions[4].textContent).toEqual('Carry a sack of corn to the market shore');
  expect(instructions[5].textContent).toEqual('Carry nothing back home');
  expect(instructions[6].textContent).toEqual('Carry a goose to the market shore');
});