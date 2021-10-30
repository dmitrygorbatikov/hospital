export const getRegisterDate = () => {
   return Date.now()
}

export const getRandomStorageIndicators = () => {
   const maxTemperature = 30
   const minTemperature = -20
   const maxHumidity = 120
   const minHumidity = 0
   return {
      temperature: Math.floor(
         Math.random() * (maxTemperature - minTemperature) + minTemperature,
      ),
      humidity: Math.floor(
         Math.random() * (maxHumidity - minHumidity) + minHumidity,
      ),
      measurementDate: getRegisterDate(),
   }
}

export const getRandomPatientIndicators = () => {
   const maxTemperature = 40
   const minTemperature = 30
   const maxPulse = 180
   const minPulse = 60
   const maxSaturation = 150
   const minSaturation = 60
   return {
      temperature: Math.floor(
         Math.random() * (maxTemperature - minTemperature) + minTemperature,
      ),
      pulse: Math.floor(Math.random() * (maxPulse - minPulse) + minPulse),
      saturation: Math.floor(
         Math.random() * (maxSaturation - minSaturation) + minSaturation,
      ),
      measurementDate: getRegisterDate(),
   }
}
