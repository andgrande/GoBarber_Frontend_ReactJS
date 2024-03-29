import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface MainPanelSelection {
  isSelected: boolean;
}

interface HourAvailability {
  isAvailable: boolean;
}

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 0;
  background: #28262e;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  > img {
    height: 80px;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;

    svg {
      color: #999591;
      width: 20px;
      height: 20px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;
  }

  span {
    color: #f4ede8;
  }

  strong {
    color: #ff9000;
  }

  a {
    text-decoration: none;
    color: #ff9000;
    transition: 0.2s;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
`;

export const SubContent = styled.div`
  flex: 1;
  flex-direction: column;
  margin-right: 120px;
`;

export const SubContentDateHour = styled.div`
  flex-direction: column;
`;

export const PanelSelection = styled.div`
  flex: 1;
  flex-direction: row;
  text-align: start;

  border-bottom: 10px;

  & button {
    font-weight: 500;
    height: 56px;
    width: 50%;
    color: #fff;
    background: #3e3b47;
    border: 0;
    border-radius: 10px 0 0 10px;
    transition: 0.2s;

    :hover {
      background: ${shade(0.3, '#3e3b47')};
    }

    :focus {
      background: ${shade(0.3, '#3e3b47')};
    }

    + button {
      border-left: 2px;
      border-style: solid;
      border-color: #312e38;
      border-radius: 0 10px 10px 0;
    }
  }
`;

export const Schedule = styled.div`
  flex: 1;
  margin-top: 25px;

  h1 {
    font-size: 36px;
  }

  p {
    margin-top: 8px;
    color: #ff9000;
    display: flex;
    align-items: center;
    font-weight: 500;

    span {
      display: flex;
      align-items: center;
    }

    span + span::before {
      content: '';
      width: 1px;
      height: 12px;
      background: #ff9000;
      margin: 0 8px;
    }
  }
`;

export const NexAppointment = styled.div`
  margin-top: 64px;

  > strong {
    color: #999591;
    font-size: 20px;
    font-weight: 400;
  }

  div {
    background: #3e3b47;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    margin-top: 24px;
    border-radius: 10px;
    position: relative;

    &::before {
      content: '';
      background: #ff9000;
      position: absolute;
      height: 80%;
      width: 1px;
      left: 0;
      top: 10%;
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: #fff;
    }

    span {
      margin-left: auto;
      display: flex;
      align-items: center;
      color: #999591;

      svg {
        color: #ff9000;
        margin-right: 8px;
      }
    }
  }
`;

export const Section = styled.section`
  margin-top: 48px;

  > strong {
    color: #999591;
    font-size: 20;
    line-height: 26px;
    border-bottom: 1px solid #3e3b47;
    display: block;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }

  > p {
    color: #999591;
    font-weight: 400;
  }
`;

export const Appointment = styled.div`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }

  span {
    margin-left: auto;
    display: flex;
    align-items: center;
    color: #f4ede8;
    width: 70px;

    svg {
      color: #ff9000;
      margin-right: 8px;
    }
  }

  div {
    flex: 1;
    background: #3e3b47;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-left: 24px;

    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: #fff;
      font-size: 20px;
      font-weight: 500;
    }
  }
`;

export const ProvidersList = styled.div`
  margin-top: 64px;
  display: flex;
  flex-wrap: wrap;

  button {
    border: 0;

    background: #3e3b47;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    margin-top: 20px;
    margin-right: 20px;
    border-radius: 10px;
    max-width: 250px;
    height: 80px;
    position: relative;
    transition: 0.2s;

    &::before {
      content: '';
      background: #ff9000;
      position: absolute;
      height: 80%;
      width: 1px;
      left: 0;
      top: 10%;
    }

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: #fff;
    }

    :hover {
      background: ${shade(0.3, '#3e3b47')};
    }

    :focus {
      background: #ff9900;
      color: #232129;
    }
  }
`;

export const Calendar = styled.aside`
  width: 380px;

  .DayPicker {
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
    background: #3e3b47;
    border-radius: 10px;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-NavButton {
    color: #999591 !important;
  }

  .DayPicker-NavButton--prev {
    right: auto;
    left: 1.5em;
    margin-right: 0;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px 0 0 0;
    padding: 16px;
    background-color: #28262e;
    border-radius: 0 0 10px 10px;
  }

  .DayPicker-Caption {
    margin-bottom: 1em;
    padding: 0 1em;
    color: #f4ede8;

    > div {
      text-align: center;
    }
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 10px;
    color: #fff;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #ff9000 !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;

export const TimeTable = styled.div`
  width: 380px;
  margin-top: 30px;
  border-radius: 10px;
  background-color: #28262e;

  display: flex;
  flex-wrap: wrap;

  padding: 10px 20px 20px;
`;

export const Hour = styled.div<HourAvailability>`
  margin-left: 20px;
  margin-top: 10px;

  button {
    width: 60px;
    height: 30px;
    border-radius: 10px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: #3e3b47;
    color: #fff;
    border: 0;
    transition: 0.2s;

    ${props =>
      props.isAvailable
        ? css`
            background: #3e3b47;
          `
        : css`
            background: ${shade(0.3, '#3e3b47')};
          `}

    :hover {
      background: ${shade(0.2, '#3e3b47')};
    }

    :focus {
      background: #ff9900;
      color: #232129;
    }
  }
`;

export const ConfirmAppointment = styled.div`
  width: 380px;
  margin-top: 30px;
  border-radius: 10px;
  background-color: #28262e;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 20px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;

    background: #3e3b47;
    color: #fff;
    border: 0;
    border-radius: 10px;
    padding: 10px 50px;
    transition: 0.2s;

    :hover {
      background: #ff9900;
      color: #232129;
    }

    :focus {
      background: #ff9900;
      color: #232129;
    }
  }
`;
