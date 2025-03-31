
function UnixToDaysLeft(targetUnixTime) {
  console.log(targetUnixTime)
  const currTimeMs = new Date()
  const currTime = currTimeMs /1000;
  const timeDiff = targetUnixTime - currTime

  const daysLeft = Math.floor(timeDiff / (60*60*24))
  return daysLeft
}

export default UnixToDaysLeft