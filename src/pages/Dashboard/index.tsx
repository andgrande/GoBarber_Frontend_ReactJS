import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { isToday, format, parseISO, isAfter } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { FiClock, FiPower } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

import logoImg from '../../assets/logo.svg';
import nullAvatar from '../../assets/no_avatar.jpg';

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  SubContent,
  SubContentDateHour,
  PanelSelection,
  Schedule,
  NexAppointment,
  Section,
  Appointment,
  ProvidersList,
  Calendar,
  TimeTable,
  Hour,
  ConfirmAppointment,
} from './styles';
import api from '../../services/api';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface HourAvailabilityItem {
  hour: number;
  available: boolean;
}

interface AppointmentsItem {
  id: string;
  date: string;
  hourFormatted: string;
  user: {
    name: string;
    avatar_url: string;
  };
}

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const [
    isSetNewAppointmentPanelOn,
    setisSetNewAppointmentPanelOn,
  ] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<string>(user.id);

  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);

  const [hourAvailability, setHourAvailability] = useState<
    HourAvailabilityItem[]
  >([]);

  const [appointments, setAppointments] = useState<AppointmentsItem[]>([]);

  const [providers, setProviders] = useState<Provider[]>([]);

  const handleDayAvailability = useCallback(() => {
    api
      .get(`/providers/${selectedProvider}/day-availability`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(response => {
        setHourAvailability(response.data);
      });
  }, [selectedDate, selectedProvider]);

  const handleCreateAppointment = useCallback(async () => {
    try {
      if (selectedHour) {
        const date = new Date(selectedDate);
        date.setHours(selectedHour);
        date.setMinutes(0);
        const log = await api.post('/appointments', {
          provider_id: selectedProvider,
          date,
        });
        console.log(log);
        console.log('log');
      }
      // navigation.navigate('AppointmentCreated', { date: date.getTime() });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleSelectProvider = useCallback(
    provider_id => {
      setSelectedProvider(provider_id);

      if (selectedProvider) {
        handleDayAvailability();
      }
    },
    [handleDayAvailability, selectedProvider],
  );

  const handleDateChange = useCallback(
    (day: Date, modifiers: DayModifiers) => {
      if (modifiers.available && !modifiers.disabled) {
        setSelectedDate(day);
      }

      if (selectedProvider) {
        handleDayAvailability();
      }
    },
    [handleDayAvailability, selectedProvider],
  );

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    if (!isSetNewAppointmentPanelOn) {
      api
        .get(`/providers/${user.id}/month-availability`, {
          params: {
            year: currentMonth.getFullYear(),
            month: currentMonth.getMonth() + 1,
          },
        })
        .then(response => {
          setMonthAvailability(response.data);
        });
    } else {
      api.get('/providers').then(response => {
        setProviders(response.data);
      });
    }
  }, [currentMonth, user.id, isSetNewAppointmentPanelOn]);

  useEffect(() => {
    api
      .get<AppointmentsItem[]>('/appointments/me', {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(response => {
        const appointmentsFormatted = response.data.map(appointment => {
          return {
            ...appointment,
            hourFormatted: format(parseISO(appointment.date), 'HH:mm'),
          };
        });
        setAppointments(appointmentsFormatted);
      });
  }, [selectedDate, user.id]);

  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter(monthDay => monthDay.available === false)
      .map(monthDay => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        return new Date(year, month, monthDay.day);
      });

    return dates;
  }, [currentMonth, monthAvailability]);

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMM", {
      locale: ptBR,
    });
  }, [selectedDate]);

  const selectedWeekDay = useMemo(() => {
    return format(selectedDate, 'EEEE', { locale: ptBR });
  }, [selectedDate]);

  const morningAppointments = useMemo(() => {
    return appointments
      .filter(appointment => {
        return parseISO(appointment.date).getHours() < 12;
      })
      .sort((a, b) => (a.hourFormatted > b.hourFormatted ? 1 : -1));
  }, [appointments]);

  const afternoonAppointments = useMemo(() => {
    return appointments
      .filter(appointment => {
        return parseISO(appointment.date).getHours() >= 12;
      })
      .sort((a, b) => (a.hourFormatted > b.hourFormatted ? 1 : -1));
  }, [appointments]);

  const nextAppointment = useMemo(() => {
    return appointments
      .sort((a, b) => (a.hourFormatted > b.hourFormatted ? 1 : -1))
      .find(appointment => {
        return isAfter(parseISO(appointment.date), new Date());
      });
  }, [appointments]);

  // console.log(monthAvailability);
  // console.log(hourAvailability);
  // console.log(providers);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            <img src={user.avatar_url ?? nullAvatar} alt={user.name} />

            <div>
              <span>Bem-vindo(a),</span>
              <Link to="/profile">
                <strong>{user.name.split(' ', 1)}</strong>
              </Link>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <SubContent>
          <PanelSelection>
            <button
              type="button"
              // style={
              //   isSetNewAppointmentPanelOn ? {} : { backgroundColor: '#3e3b47' }
              // }
              onClick={() => {
                setisSetNewAppointmentPanelOn(false);
              }}
            >
              Meus agendamentos
            </button>
            <button
              type="button"
              // style={
              //   isSetNewAppointmentPanelOn ? { backgroundColor: '#3e3b47' } : {}
              // }
              onClick={() => {
                setisSetNewAppointmentPanelOn(true);
              }}
            >
              Agendar Novo horário
            </button>
          </PanelSelection>
          {!isSetNewAppointmentPanelOn ? (
            <Schedule>
              <h1>Horário Agendado</h1>
              <p>
                {isToday(selectedDate) && <span>Hoje</span>}
                <span>{selectedDateAsText}</span>
                <span>{selectedWeekDay}</span>
              </p>

              {isToday(selectedDate) && nextAppointment && (
                <NexAppointment>
                  <strong>Atendimento a seguir</strong>
                  <div>
                    <img
                      src={nextAppointment.user.avatar_url}
                      alt={nextAppointment.user.name}
                    />
                    <strong>{nextAppointment.user.name}</strong>
                    <span>
                      <FiClock />
                      {nextAppointment.hourFormatted}
                    </span>
                  </div>
                </NexAppointment>
              )}

              <Section>
                <strong>Manhã</strong>

                {morningAppointments.length === 0 && (
                  <p>Nenhum agendamento neste período</p>
                )}

                {morningAppointments.map(appointment => (
                  <Appointment key={appointment.id}>
                    <span>
                      <FiClock />
                      {appointment.hourFormatted}
                    </span>

                    <div>
                      <img
                        src={appointment.user.avatar_url}
                        alt={appointment.user.name}
                      />
                      <strong>{appointment.user.name}</strong>
                    </div>
                  </Appointment>
                ))}
              </Section>

              <Section>
                <strong>Tarde</strong>
                {afternoonAppointments.length === 0 && (
                  <p>Nenhum agendamento neste período</p>
                )}

                {afternoonAppointments.map(appointment => (
                  <Appointment key={appointment.id}>
                    <span>
                      <FiClock />
                      {appointment.hourFormatted}
                    </span>

                    <div>
                      <img
                        src={appointment.user.avatar_url}
                        alt={appointment.user.name}
                      />
                      <strong>{appointment.user.name}</strong>
                    </div>
                  </Appointment>
                ))}
              </Section>
            </Schedule>
          ) : (
            <Schedule>
              <h1>Disponibilidade</h1>
              <p>
                {isToday(selectedDate) && <span>Hoje</span>}
                <span>{selectedDateAsText}</span>
                <span>{selectedWeekDay}</span>
              </p>
              <p>
                {selectedHour && (
                  <>
                    <span>Às</span>
                    <span>{selectedHour}</span>
                  </>
                )}
              </p>

              <ProvidersList>
                {providers.map(provider => (
                  // <div key={provider.id}>
                  <button
                    key={provider.id}
                    type="button"
                    onClick={() => handleSelectProvider(provider.id)}
                  >
                    <img
                      src={
                        provider.avatar_url ? provider.avatar_url : nullAvatar
                      }
                      alt={provider.name}
                    />
                    <strong>{provider.name}</strong>
                  </button>
                ))}
              </ProvidersList>
            </Schedule>
          )}
        </SubContent>
        <SubContentDateHour>
          <Calendar>
            <DayPicker
              weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
              fromMonth={new Date()}
              disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
              modifiers={{
                available: { daysOfWeek: [1, 2, 3, 4, 5] },
              }}
              selectedDays={selectedDate}
              onDayClick={handleDateChange}
              onMonthChange={handleMonthChange}
              months={[
                'Janeiro',
                'Fevereiro',
                'Março',
                'Abril',
                'Maio',
                'Junho',
                'Julho',
                'Agosto',
                'Setembro',
                'Outubro',
                'Novembro',
                'Dezembro',
              ]}
            />
          </Calendar>
          {isSetNewAppointmentPanelOn && (
            <>
              <TimeTable>
                {hourAvailability.map(hour => (
                  <Hour isAvailable={hour.available}>
                    <button
                      // style={{
                      //   backgroundColor: hour.available ? '' : '#CCC',
                      // }}
                      type="button"
                      onClick={() => setSelectedHour(9)}
                    >
                      <span>
                        {hour.hour}
                        :00
                      </span>
                    </button>
                  </Hour>
                ))}
              </TimeTable>
              {isSetNewAppointmentPanelOn && selectedHour && (
                <ConfirmAppointment>
                  <button
                    type="submit"
                    onClick={() => handleCreateAppointment()}
                  >
                    Confirmar Agendamento
                  </button>
                </ConfirmAppointment>
              )}
            </>
          )}
        </SubContentDateHour>
      </Content>
    </Container>
  );
};

export default Dashboard;
