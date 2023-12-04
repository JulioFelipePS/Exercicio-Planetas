bodies = []
async function getbodies(){
    console.log('buscando dados')
    const result = await 
    axios.get("https://api.le-systeme-solaire.net/rest/bodies/")
    console.log('terminou')
    bodies.push(...result.data.bodies)
    console.log('Exercicio 2')
    console.log(ex2())
    console.log('Exercicio 3')
    ex3()
    console.log('Exercicio 4')
    console.log(ex4())
    console.log('Exercicio 5')
    console.log(ex5())
    console.log('Exercicio 6')
    console.log(ex6())
    console.log('Exercicio 7')
    console.log(ex7())
    console.log('Exercicio 8')
    console.log(ex8())
    console.log('Exercicio 9')
    console.log(ex9())
    console.log('Exercicio 10')
    console.log(ex10())
    console.log('Exercicio 11')
    console.log(ex11('Venus'))
    console.log('Exercicio 12')
    console.log(ex12())
    console.log('Exercicio 13')
    console.log(ex13())
    console.log('Exercicio 14')
    console.log(ex14())
    console.log('Exercicio 15')
    console.log(ex15())
    console.log('Exercicio 16')
    console.log(ex16())
    console.log('Exercicio 17')
    console.log(ex17())
    console.log('Exercicio 18')
    console.log(ex18())
    console.log('Exercicio 19')
    ex19()
}




function ex2(){
    let planetas = []
    bodies.filter((body)=>{
        if(body.isPlanet === true){
            planetas.push(body)
        }
    })
    return planetas
}

function ex3(){
    let terra = bodies.find((body)=>body.englishName === 'Earth')
    console.log(terra)
}

function ex4(){
    let planetas = []
    let semlua = []
    bodies.filter((body)=>{
        if(body.isPlanet === true){
            planetas.push(body)
        }
    })
    planetas.some((planeta)=>{
        if(planeta.moons===null){
            semlua.push(planeta)
        }
    })
    return semlua
}
//5. Transforme os Dados com map: Use o método map para criar um novo array contendo apenas os nomes dos planetas
function ex5(){
    let nome = bodies.map((bd)=>bd.englishName)
    return nome
}
function ex6(){
    let nome = bodies.map((bd)=>({
        nome:bd.englishName,
        raio:bd.meanRadius

    }))
    nome.sort((a,b)=>b.raio-a.raio)
    return nome
}

function ex7(){
    let nome = []
    bodies.forEach(element => {
        if(element.isPlanet===true){
            nome.push(element.englishName)
        }
    });
    nome = nome.join(", ")
    return nome
}

function ex8() {
    let planetas = [];
    
    bodies.map((bd) => {
        if (bd.isPlanet === true) {
            planetas.push({
                nome: bd.englishName,
                raio: bd.meanRadius,
                massa: Math.pow(bd.mass.massValue,bd.mass.massExponent)              
            });
        }
    });

    planetas.sort((a, b) => a.raio - b.raio);
    planetas.splice(5,3)
    const somaMassas = planetas.reduce((acc,planeta)=>{
        return acc+planeta.massa
    },0)

    return somaMassas
}

// 9. Luas e Desidade: verifique se algum planeta tem mais de 2 luas e, em caso afirmativo, listar todos os planetas entre eles que tem densidade maior que 1


function ex9(){
    let planetas = [];
    
    bodies.map((bd) => {
        if (bd.isPlanet === true) {
            if(bd.moons && bd.moons.length > 2){
                if(bd.density>1){
                    planetas.push(bd)
                }
              }
        }
    });
    return planetas
}

function ex10(){
    let astrosAno = [];
    bodies.map((bd)=>{
        if(bd.discoveryDate){
            astrosAno.push({
                nome: bd.englishName,
                dia:Number(bd.discoveryDate.split('/')[0]),
                mes:Number(bd.discoveryDate.split('/')[1]),
                ano:Number(bd.discoveryDate.split('/')[2])    
            })
        }
    })
    astrosAno.forEach(element => {
        if(!element.ano){
            element.ano=element.dia;
            element.dia=NaN
        }
    });
    astrosAno.sort((a,b)=>{
        if(a.ano!==b.ano){
            return b.ano-a.ano
        }else if(a.mes!==b.mes){
            return b.mes-a.mes
        }else{
            return b.dia-a.dia
        }
    })
    return astrosAno
}
// distancia, a massa, gravidade e densidade
function ex11(x){
    let planeta =[] 
    bodies.filter((bd)=>{
        if(bd.englishName===x){
            planeta.push({
                nome: bd.englishName,
                densidade: bd.density,
                massa: Math.pow(bd.mass.massValue,bd.mass.massExponent),
                gravidade: bd.gravity,
                Maior_distancia_do_sol:bd.aphelion


            })
        }
    })
    return planeta

}

function ex12(){
    let body=[]
    bodies.filter((bd)=>{
        if(bd.avgTemp-273.15>=8&&bd.avgTemp-273.15<=30){
            body.push({
                nome:bd.englishName,
                temperatura:bd.avgTemp-273
            })
        }
    })
    body.sort((a,b)=> a.avgTemp- b.avgTemp)
    return body
}

// 13. Separando Planetas. Faça uma função que retorna um objeto, separando todos os astros pelo seu tipo. bodyType 

function ex13() {
    const bdtipos = bodies.reduce((acumulador, bd) => {
        const tipo = bd.bodyType;
        if (!acumulador[tipo]) {
            acumulador[tipo] = [];
        }
        acumulador[tipo].push(bd);

        return acumulador;
    }, {});

    return bdtipos;
}
// 14. Ordenação Complexa: Use sort e slice para ordenar os planetas primeiro por tipo e depois por tamanho, pegando os 3 maiores de cada tipo.
function ex14() {
    const bdtipos = bodies.reduce((acumulador, bd) => {
        const tipo = bd.bodyType;
        if (!acumulador[tipo]) {
            acumulador[tipo] = [];
        }
        acumulador[tipo].push({
            nome:bd.englishName,
            tipo:bd.bodyType,
            raio:bd.meanRadius
        });
        acumulador[tipo].sort((a,b)=>b.meanRadius-a.meanRadius)
        return acumulador;
    }, {});
        
    for (const tipo in bdtipos) {
        if (bdtipos.hasOwnProperty(tipo)) {
            bdtipos[tipo].sort((a, b) => b.raio - a.raio);
            bdtipos[tipo] = bdtipos[tipo].slice(0, 3);
        }
    }

    return bdtipos;
}


// 15. Encontrando planetas orbitados. Encontre todos os planetas que são orbitados por pelo menos um corpo celeste. Imprima na tela o nome do planeta e seus orbitadores. 
function ex15(){
    let planetas = [];
    
    bodies.map((bd) => {
        if (bd.isPlanet === true) {
            if(bd.moons){
                    planetas.push({
                        name:bd.englishName,
                        luas: bd.moons
                    })
                }
              }
        })
    
    return planetas
}


// 16. Média da Massa dos Planetas: Use o método reduce para calcular a média da massa de todos os planetas e imprimir o resultado.
function ex16(){
    let planetas = [];
    
    bodies.map((bd) => {
        if (bd.isPlanet === true) {
            planetas.push(bd.mass.massValue*Math.pow(10,bd.mass.massExponent))
              }
        })
        const somaTotal = planetas.reduce((acumulador, massa) => acumulador + massa, 0);
        const media = somaTotal/planetas.length
    return media
}
// 17. Calcule a distância entre Saturno e Plutão. Utilize o perihelion e o aphelion para calcular a menor distância possível entre os planetas
function ex17(){
        let saturno 
        let pluto 
        bodies.filter((bd)=>{
            if(bd.englishName==='Saturn'){
                saturno = bd.perihelion
            }
        })
        bodies.filter((bd)=>{
            if(bd.englishName==='Pluto'){
                pluto = bd.aphelion
            }
        })
        return pluto-saturno
    
    }

// 18. Planetas com Luas: liste todos os planetas que têm uma ou mais luas. Imprima na tela o planeta, e quantas luas ele tem. 
function ex18(){
    let planetas = [];
    
    bodies.map((bd) => {
        if (bd.isPlanet === true) {
            if(bd.moons){
                    planetas.push({
                        name:bd.englishName,
                        luas: bd.moons.length
                    })
                }
              }
        })
    
    return planetas
}
// 19. O Desafio Final em Manipulação de Dados e Cálculos 
// Análise Estatística do Sistema Solar: Utilize os métodos para realizar uma análise estatística completa dos planetas do sistema solar. 
// - Crie um novo array que contém apenas planetas (excluindo luas, asteroides, etc.). 
// - Crie um novo array que contém apenas as massas dos planetas. - Ordene o array de massas em ordem crescente. 
// - Calcule a mediana das massas dos planetas. A mediana é o valor do meio em um conjunto de dados ordenado. Se o conjunto tem um número ímpar de observações, a mediana é o valor do meio. Se o conjunto tem um número par de observações, a mediana é a média dos dois valores do meio. 
// - Encontrar Planeta Mais Próximo da Mediana: encontre o planeta cuja massa é mais próxima da mediana calculada.
function ex19(){
    let massas = []
    let planetas =[]
    bodies.map((bd) => {
        if (bd.isPlanet === true) {
            massas.push(bd.mass.massValue*Math.pow(10,bd.mass.massExponent))
            planetas.push({
                nome:bd.englishName,
                massa: bd.mass.massValue*Math.pow(10,bd.mass.massExponent)
            })
              }
        })
        massas.sort((a, b) => a-b)
        console.log(planetas)
        console.log(massas)
        let mediana
        if(massas.length%2===1){
        mediana = massas[massas.length/2]
        }else{
        mediana = ((massas[massas.length/2])+(massas[(massas.length/2)-1]))/2
        }
        console.log(`Mediana: ${mediana}`)
        let p1
        let dif = Infinity;
        planetas.forEach(pl => {
            if(Math.abs(pl.massa-mediana)<dif){
                dif = Math.abs(pl.massa-mediana)
                p1 = pl.nome
            }
        });
        console.log(`Planeta mais proximo da mediana: ${p1}`)
}

getbodies()

// const planetas = bodies.filter((bd)=>{
//     return bd.isplanet === true
//      })
//  console.log(planetas)

//  let terra = bodies.find((x)=>{
//     return x.name === "Earth"
//  })

//  console.log(terra)

// const planetas = bodies.filter((pl)=>pl.isplanet===true)

// console.log(planetas)
// axios.get("https://api.le-systeme-solaire.net/rest/bodies/").then((result)=>{
//     console.log(result.data.bodies)
// }).catch((err)=>{
//     const erro ='deu problema'
//     console.log(erro)
// }).finally(()=>console.log('finazlizada'))