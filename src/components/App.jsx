import {useState} from "react";
import { FeedbackOptions } from "./FeedbackOptions/FeedbackOptions";
import { Statistics } from "./Statistics/Statistics";
import { Section } from "./Section/Section";
import { Notification } from "./Notification/Notification";

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const options = {
    good,
    neutral,
    bad,
  };

  const feedbackCounter = event => {
    switch (event.target.innerText) {
      case 'good':
        setGood(s => s + 1);
        break;
      
      case 'neutral':
        setNeutral(s => s + 1);
        break;
      
      case 'bad':
        setBad(s => s + 1);
        break;
      
      default:
        return;
    };
  };

  const countTotalFeedback = good + neutral + bad;
  const countPositiveFeedbackPercentage = good === 0 ? 0 : Math.round(good * 100 / countTotalFeedback);

  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions options={options} onLeaveFeedback={feedbackCounter} />
      </Section>
    
      <Section title="Statistics">
        {countTotalFeedback === 0
          ? <Notification message="There is no feedback" />
          : <Statistics good={good} neutral={neutral} bad={bad}
            total={countTotalFeedback} positivePercentage={countPositiveFeedbackPercentage} />
        }
      </Section>
    </>
  );
};