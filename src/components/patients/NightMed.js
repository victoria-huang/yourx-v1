import React from 'react'
import EditPrescription from '../prescriptions/EditPrescription'

const NightMed = (props) => {
  const times = props.times.map((t, idx) => {
    if (t.take_time.time_of_day === "night") {
      return <p key={idx}>Take at {t.take_time.formatted_time}</p>
    }
  })

  return (
    <div>
      <h4>{props.med.brand_name}</h4>
      { times }
      { props.times[0].rx_take_time.taken && props.day === "today" ? "Taken" : null }
      <EditPrescription
        rxTakeTimeId={props.times[0].rx_take_time.id}
        prescriptionId={props.med.id}
        day={props.day}
        text={props.times[0].rx_take_time.taken ? 'Untake' : 'Take'}
      />
      <br />
    </div>
  )
}

export default NightMed;
