export const fetchPatientAdherence = (userId) => {
  return fetch(`http://localhost:3000/api/v1/patients/${userId}/daily_adherence`, {
    headers: {
      'Authorization': localStorage.getItem('token')
    }
  }).then(r => r.json())
}

export const fetchPatient = (userId) => {
  return fetch(`http://localhost:3000/api/v1/patients/${userId}`, {
    headers: {
      'Authorization': localStorage.getItem('token')
    }
  }).then(r => r.json())
}

export const fetchPatientDailyMeds = (userId) => {
  return fetch(`http://localhost:3000/api/v1/patients/${userId}/daily_meds`, {
    headers: {
      'Authorization': localStorage.getItem('token')
    }
  }).then(r => r.json())
}

export const getUser = () => {
  return fetch(`http://localhost:3000/get_user`, {
    headers: {
      'Authorization': localStorage.getItem('token')
    }
  }).then(r => r.json())
}

export const createTakeTime = (body) => {
  return fetch(`http://localhost:3000/api/v1/take_times`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    }
  }).then(r => r.json())
}

export const createPrescription = (body) => {
  return fetch(`http://localhost:3000/api/v1/prescriptions`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    }
  }).then(r => r.json())
}

export const createPrescriptionTakeTime = (body) => {
  return fetch(`http://localhost:3000/api/v1/prescription_take_times`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    }
  }).then(r => r.json())
}

export const deletePrescriptionTakeTime = (rxTakeTimeId) => {
  return fetch(`http://localhost:3000/api/v1/prescription_take_times/${rxTakeTimeId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': localStorage.getItem('token')
    }
  })
}

export const takeMed = (rxTakeTimeId) => {
  return fetch(`http://localhost:3000/api/v1/prescription_take_times/${rxTakeTimeId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      taken: true
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    }
  })
}

export const untakeMed = (rxTakeTimeId) => {
  return fetch(`http://localhost:3000/api/v1/prescription_take_times/${rxTakeTimeId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      taken: false
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    }
  })
}

export const getPrescription = (prescriptionId) => {
  return fetch(`http://localhost:3000/api/v1/prescriptions/${prescriptionId}`, {
    headers: {
      'Authorization': localStorage.getItem('token')
    }
  }).then(res => res.json())
}

export const deletePrescriptionFetch = (prescriptionId) => {
  return fetch(`http://localhost:3000/api/v1/prescriptions/${prescriptionId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': localStorage.getItem('token')
    }
  })
}

export const editPrescriptionFetch = (prescriptionId, rxBody) => {
  return fetch(`http://localhost:3000/api/v1/prescriptions/${prescriptionId}`, {
    method: 'PATCH',
    body: JSON.stringify(rxBody),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    }
  }).then(res => res.json())
}

export const getSearchDrugNames = (searchTerm) => {
  return fetch('https://rxnav.nlm.nih.gov/REST/displaynames', {
    headers : {
      'Accept': 'application/json'
     }
  })
  .then(res => res.json())
  .then(json => {
     return json.displayTermsList.term.filter(e => e.toLowerCase().includes( searchTerm.toLowerCase() ))
  })
}

export const getRxcui = (drugName) => {
  const search = drugName.toLowerCase().split(' ').join('+');
  return fetch(`https://rxnav.nlm.nih.gov/REST/rxcui?name=${search}`, {
    headers : {
      'Accept': 'application/json'
     }
  }).then(res => res.json())
}

export const getInteractions = (rxcuiArray) => {
  const searchNums = rxcuiArray.join('+');
  return fetch(`https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=${searchNums}`, {
    headers : {
      'Accept': 'application/json'
     }
  }).then(res => res.json())
}
