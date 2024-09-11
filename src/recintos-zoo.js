
// checks if some element of an array maches any element on another array
function checkifBiomesmaches(biomesZoo, biomeAnimal) {
    const found = biomesZoo.some(r=> biomeAnimal.includes(r))
    return found
  }
//...
function isInt(value) {
    return !isNaN(value) && 
           parseInt(Number(value)) == value && 
           !isNaN(parseInt(value, 10));
  }

//...
function allEqual(arr){
    const equal = arr.every(val => val == arr[0]);
    return equal
}
class RecintosZoo {
    constructor(name, biome, totalSize, animals) {
        this.name = name
        this.biome = biome
        this.totalSize = totalSize
        var i
        var newAnimal
        var AnimalsObjects = []
        //recieves an array of strings of animal names and populates another array with created objects for those animals that goes in hte animals parameter
        if (animals != null ){
            if (animals != []){
                for (i = 0; i < animals.length; i++) {
                    newAnimal = new Animal(animals[i]),
                    AnimalsObjects.push(newAnimal)
                }
                this.animals = AnimalsObjects}}
    }
    //method for returning the string of a valid possible recinto
    recintoValido(recinto, ocupiedSpace, fitSize){
        var nome = recinto.name
        var newFreespace = recinto.totalSize - ocupiedSpace - fitSize
        var valido = nome + ' (espaço livre: '+ newFreespace + ' total: ' + recinto.totalSize +')'
        return valido
    }

    //check if animal is valid and quantity is valid before running the main code for each recinto
    //probably whould re-write those nested if's using switch case but the code is working and i'm not doing benchmaks for a test
    analisaRecintos(animal, quantidade) {
        let Recinto1 = new RecintosZoo("Recinto 1", ["savana"], 10, ["MACACO", "MACACO", "MACACO"])
        let Recinto2 = new RecintosZoo("Recinto 2", ["floresta"], 5, [])
        let Recinto3 = new RecintosZoo("Recinto 3", ["savana", "rio"], 7, ["GAZELA"])
        let Recinto4 = new RecintosZoo("Recinto 4", ["rio"], 8, [])
        let Recinto5 = new RecintosZoo("Recinto 5", ["savana"], 9, ["LEAO"])
        var Recintos = [Recinto1, Recinto2, Recinto3, Recinto4, Recinto5]
        var recintosValidos = []
        var animaL = new Animal(animal)
        if (isInt(quantidade) && quantidade > 0 ){
            if(animaL.valid == true){
                Recintos.forEach(recinto =>{
                    recinto.analisaRecintosRecinto(animal, quantidade, recintosValidos, recinto)})
                if (recintosValidos.length > 0 ){
                    return {erro: false,
                            recintosViaveis: recintosValidos}
                }else{
                    return {erro: "Não há recinto viável",
                        recintosViaveis: false}
                }
                }else{
                return {
                erro: 'Animal inválido',
                recintosViaveis: false
                };
            }
        }else{
            return {
                erro: "Quantidade inválida",
                recintosViaveis: false
                }
        }



    }


//the main part of the code where the conditions for the return of a string is checked
    analisaRecintosRecinto(animal, quantidade, recintosValidos, recinto) {
        //var declarations and some array populating that are needed for some if's
            var animalToAnalise = []
            var fitSize = 0
            var animalBiome = []
            var total = recinto.totalSize
            var ocupiedSpace = 0
            animalToAnalise = Animal.animalToAnalise(animal, quantidade)
            animalToAnalise.forEach(animaltoanalize => fitSize = fitSize + animaltoanalize.size)
            animalToAnalise.forEach(animaltoanalize => animaltoanalize.biome.forEach(biome => animalBiome.push(biome)))

            if (checkifBiomesmaches(recinto.biome, animalBiome)) {
                if (recinto.animals.length == 0 ) {
                    //test for alone monkey
                    if(quantidade == 1 && animal == "MACACO" ){
                        return 0
                    }else{
                        if (fitSize <= total){
                            return recintosValidos.push(recinto.recintoValido(recinto, ocupiedSpace, fitSize))
                        }else{
                            return 0
                        }}
                } else {
                    var allAnimalsNames = []
                    var totalFreespace = 0
                    recinto.animals.forEach(animaltoanalize => ocupiedSpace = ocupiedSpace + animaltoanalize.size),
                    recinto.animals.forEach(animaltoanalize => allAnimalsNames.push(animaltoanalize.animal)),
                    animalToAnalise.forEach(animaltoanalize => allAnimalsNames.push(animaltoanalize.animal))
                    if (allEqual(allAnimalsNames)){
                        totalFreespace = total - ocupiedSpace - fitSize
                        if ( fitSize <= total - ocupiedSpace){
                            return recintosValidos.push(recinto.recintoValido(recinto, ocupiedSpace, fitSize)) 
                        }else{
                            return 0 
                        }
                    }else{
                        ocupiedSpace = ocupiedSpace + 1
                        if (recinto.animals.some(animaltoanalize => animaltoanalize.carnivore == true)
                            || animalToAnalise.some(animaltoanalize => animaltoanalize.carnivore == true)){
                            return 0
                        }else if (allAnimalsNames.includes("HIPOPOTAMO") ){
                            var hiP = new Animal("HIPOPOTAMO")
                            if (JSON.stringify(recinto.biome) == JSON.stringify(hiP.biome)){
                                if (fitSize <= total - ocupiedSpace){
                                    return recintosValidos.push(recinto.recintoValido(recinto, ocupiedSpace, fitSize)) 
                                }else{
                                    console.log("nao cube")
                                    return 0
                                }
                            }else{
                                console.log("nao deve chegar aqui no hipopotamo recinto 3", recinto.biome, recinto.name)
                                return 0 
                            }    
                        }else{
                            if (fitSize <= total - ocupiedSpace){
                                return recintosValidos.push(recinto.recintoValido(recinto, ocupiedSpace, fitSize)) 
                            }else{
                                return 0
                            }
                            
                        }

                    }
                }
            } else {
                return 0
            }
    }

}


class Animal {
    constructor(animal) {
        this.animal = animal
        switch (animal) {
            case "LEAO":
                this.carnivore = true
                this.size = 3
                this.biome = ["savana"]
                this.valid = true
                break;
            case "LEOPARDO":
                this.carnivore = true
                this.size = 2
                this.biome = ["savana"]
                this.valid = true
                break;
            case "CROCODILO":
                this.carnivore = true
                this.size = 3
                this.biome = ["rio"]
                this.valid = true
                break;
            case "MACACO":
                this.carnivore = false
                this.size = 1
                this.biome = ["savana", "floresta"]
                this.valid = true
                break;
            case "GAZELA":
                this.carnivore = false
                this.size = 2
                this.biome = ["savana"]
                this.valid = true
                break;
            case "HIPOPOTAMO":
                this.carnivore = false
                this.size = 4 
                this.biome = ["savana", "rio"]
                this.valid = true
                break;
            default:
                "This is not a valid animal"
                this.valid = false
                break;
        }
    }
    static animalToAnalise(respAnimal, respQuant) {
        var i
        var newAnimal
        var animalToAnalise = []
        for (i = 0; i < respQuant; i++) {
            newAnimal = new Animal(respAnimal)
            animalToAnalise.push(newAnimal)
        }

        return animalToAnalise

    }

}




    

export { Animal as Animal }
export { RecintosZoo as RecintosZoo };
