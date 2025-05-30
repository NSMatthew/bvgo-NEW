import React, { useState } from 'react';
import { View } from 'react-native';

import Calendar from './calendar';
import Events from './events';

type CalendarProps = {
  activeTab: 'Events' | 'Calendar';
};

const CalendarTabs = ({ activeTab }: CalendarProps) => {
  return <View style={{ flex: 1 }}>{activeTab === 'Calendar' ? <Calendar /> : <Events />}</View>;
};

export default CalendarTabs;