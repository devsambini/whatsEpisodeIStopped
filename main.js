const KEY_LS = '@saveseries'


function visable(page, newRegister = false) {
  document.body.setAttribute('page', page)
  if(page === 'registers') {
    if(newRegister) clearInputs()
    document.getElementById('name').focus()
  }
}

let listRegisters = {
  lastIdRegister: 0,
  series: []
}

function render() {
  const tbody = document.getElementById('panel')
  if(tbody) {
    tbody.innerHTML = listRegisters.series.map( series => 
      `<tr>
        <td>${series.name}</td>
        <td>${series.season}</td>
        <td>${series.episode}</td>
        <td><button class="red" onclick="removeSeries(${series.id})">Remove</button></td>
      </tr>`
    ).join('')
  }
}

function addSeries(name, season, episode) {
  const id = listRegisters.lastIdRegister + 1
  listRegisters.lastIdRegister = id
  listRegisters.series.push({
    id, name, season, episode
  })
  setSeries()
  render()
  visable('list')  
}

function submitSeries(e) {
  e.preventDefault()
  const data = {
    name: document.getElementById('name').value,
    season: document.getElementById('season').value,
    episode: document.getElementById('episode').value,
  }
  addSeries(data.name, data.season, data.episode)
}

function clearInputs() {
  document.getElementById('name').value = ''
  document.getElementById('season').value = ''
  document.getElementById('episode').value = ''
}

function setSeries() {
  localStorage.setItem(KEY_LS, JSON.stringify(listRegisters))
}

function getSeries() {
  const dataLocalStorage = localStorage.getItem(KEY_LS)
  if(dataLocalStorage) {
    listRegisters = JSON.parse(dataLocalStorage)
  }
  render()
}

function removeSeries(id) {
  listRegisters.series = listRegisters.series.filter( series => {
    return series.id != id
  })
  setSeries()
  render()
}

window.addEventListener('load', () => {
  getSeries()
  document.getElementById('registers').addEventListener('submit', submitSeries)
})

