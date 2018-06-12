// import uuid from 'uuid';

export default (state = {
  all: [],
  today: [],
  mon: [],
  tues: [],
  wed: [],
  thurs: [],
  fri: [],
  sat: [],
  sun: []
}, action) => {
  switch (action.type) {
    case 'SET_DAILY_PRESCRIPTIONS':
      return { ...state, today: action.prescriptions };
    case 'SET_ALL_PRESCRIPTIONS':
      let monRx, tuesRx, wedRx, thursRx, friRx, satRx, sunRx;

      const mondayRx = action.prescriptions.filter(p => {
        return p.times.filter(t => t.take_time.day === "Monday" ).length > 0
      })

      if (mondayRx.length > 0) {
        monRx = mondayRx.map(p => {
          return {...p, times: p.times.filter(t => t.take_time.day === "Monday" )}
        })
      } else {
        monRx = [];
      }

      const tuesdayRx = action.prescriptions.filter(p => {
        return p.times.filter(t => t.take_time.day === "Tuesday" ).length > 0
      })

      if (tuesdayRx.length > 0) {
        tuesRx = tuesdayRx.map(p => {
          return {...p, times: p.times.filter(t => t.take_time.day === "Tuesday" )}
        })
      } else {
        tuesRx = [];
      }

      const wednesdayRx = action.prescriptions.filter(p => {
        return p.times.filter(t => t.take_time.day === "Wednesday" ).length > 0
      })

      if (wednesdayRx.length > 0) {
        wedRx = wednesdayRx.map(p => {
          return {...p, times: p.times.filter(t => t.take_time.day === "Wednesday" )}
        })
      } else {
        wedRx = [];
      }

      const thursdayRx = action.prescriptions.filter(p => {
        return p.times.filter(t => t.take_time.day === "Thursday" ).length > 0
      })

      if (thursdayRx.length > 0) {
        thursRx = thursdayRx.map(p => {
          return {...p, times: p.times.filter(t => t.take_time.day === "Thursday" )}
        })
      } else {
        thursRx = [];
      }

      const fridayRx = action.prescriptions.filter(p => {
        return p.times.filter(t => t.take_time.day === "Friday" ).length > 0
      })

      if (fridayRx.length > 0) {
        friRx = fridayRx.map(p => {
          return {...p, times: p.times.filter(t => t.take_time.day === "Friday" )}
        })
      } else {
        friRx = [];
      }

      const saturdayRx = action.prescriptions.filter(p => {
        return p.times.filter(t => t.take_time.day === "Saturday" ).length > 0
      })

      if (saturdayRx.length > 0) {
        satRx = saturdayRx.map(p => {
          return {...p, times: p.times.filter(t => t.take_time.day === "Saturday" )}
        })
      } else {
        satRx = [];
      }

      const sundayRx = action.prescriptions.filter(p => {
        return p.times.filter(t => t.take_time.day === "Sunday" ).length > 0
      })

      if (sundayRx.length > 0) {
        sunRx = sundayRx.map(p => {
          return {...p, times: p.times.filter(t => t.take_time.day === "Sunday" )}
        })
      } else {
        sunRx = [];
      }

      return {
        ...state,
        all: action.prescriptions,
        mon: monRx,
        tues: tuesRx,
        wed: wedRx,
        thurs: thursRx,
        fri: friRx,
        sat: satRx,
        sun: sunRx
      };
    case 'ADD_PRESCRIPTION':
      return {...state, all: state.all.concat(action.prescription)}
    case 'TAKE_PRESCRIPTION':
      const prescriptionIdx = state.today.findIndex(p => {
        if (p.times.length - 1 >= action.timesIdx) {
          return action.rxTakeTimeId === p.times[action.timesIdx].rx_take_time.id
        }
      })
      let todayTakeCopy = state.today.slice()
      todayTakeCopy[prescriptionIdx].times[action.timesIdx].rx_take_time.taken = true;

      return {
        ...state,
        today: todayTakeCopy
      }
    case 'UNTAKE_PRESCRIPTION':
      const prescriptionIndx = state.today.findIndex(p => {
        if (p.times.length - 1 >= action.timesIdx) {
          return action.rxTakeTimeId === p.times[action.timesIdx].rx_take_time.id
        }
      })
      let todayUntakeCopy = state.today.slice()
      todayUntakeCopy[prescriptionIndx].times[action.timesIdx].rx_take_time.taken = false;

      return {
        ...state,
        today: todayUntakeCopy
      }
    case 'EDIT_PRESCRIPTION':

    case 'DELETE_PRESCRIPTION':

    case 'DELETE_DOSE':
      const doseDeleteIdx = state[action.day].findIndex(p => {
        if (p.times.length - 1 >= action.timesIdx) {
          return action.rxTakeTimeId === p.times[action.timesIdx].rx_take_time.id
        }
      })

      let dayCopy = state[action.day].slice()
      dayCopy[doseDeleteIdx].times.splice(action.timesIdx, 1)

      return {
        ...state,
        [action.day]: dayCopy
      }
    default:
      return state;
  }
}
