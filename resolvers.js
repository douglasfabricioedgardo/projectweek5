// resolvers.js
const hospitals = []; // Una matriz para simular una base de datos

const resolvers = {
  Query: {
    hospital: (_, { id }) => hospitals.find(h => h.id === id),
  },
  Mutation: {
    createHospital: (_, { input }) => {
      const newHospital = { id: Date.now().toString(), ...input };
      hospitals.push(newHospital);
      return newHospital;
    },
    updateHospital: (_, { id, input }) => {
      const hospitalIndex = hospitals.findIndex(h => h.id === id);
      if (hospitalIndex === -1) {
        throw new Error('Hospital no encontrado');
      }
      hospitals[hospitalIndex] = { ...hospitals[hospitalIndex], ...input };
      return hospitals[hospitalIndex];
    },
    deleteHospital: (_, { id }) => {
      const hospitalIndex = hospitals.findIndex(h => h.id === id);
      if (hospitalIndex === -1) {
        throw new Error('Hospital no encontrado');
      }
      const deletedHospital = hospitals.splice(hospitalIndex, 1)[0];
      return deletedHospital;
    },
  },
};

module.exports = resolvers;
