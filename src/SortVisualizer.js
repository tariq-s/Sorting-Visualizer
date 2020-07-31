import React,  { useEffect, useState, Component } from 'react'
import ArrayContainer from './ArrayContainer'
import ButtonSection from './ButtonSection'



class SortVisualizer extends Component {

    constructor() {
        super()
        this.state = {
            arraySize: 50,
            array: [],
            colors: []
        }
        this.sortInsertion = this.sortInsertion.bind(this)
        this.sortCoctail = this.sortCoctail.bind(this)
        this.sortBubble = this.sortBubble.bind(this)
        this.sortMerge = this.sortMerge.bind(this)
    }

    
    componentDidMount() {
        this.setState({
            array: this.getNewArray(5, 470, this.state.arraySize),
            colors: new Array(this.state.arraySize).fill("#008ECC")
        })
    }

    getMergeSortAnimations = (arr) => {
        const animations = []
        function mergeSort(arr, low, high) {
            if(low < high) {
                let mid = Math.floor((low + high) / 2)
                mergeSort(arr, low, mid)
                mergeSort(arr, mid + 1, high)
                merge(arr, low, mid + 1, high)
            }
        }
        function merge (arr, low, mid, high) {
            let i = low,
                j = mid,
                k = low
            while(i <= mid - 1 && j <= high) {
                animations.push(["select", i, j])
                animations.push(["de-select", i, j])
                if (arr[i] >= arr[j]) {
                    animations.push(["shift", i, j-1])
                    let temp = arr[j]
                    let a = i,
                    b = j-1
                    while(b >= a) {
                        arr[b + 1] = arr[b]
                        b--
                    }

                    animations.push(["change-height", k, temp])
                    arr[k] = temp

                    j++; mid++
                    
                }
                k++
                i++
            }
        }
        mergeSort(arr, 0, arr.length - 1)
        return animations
    }

    async sortMerge() {
        const animations = this.getMergeSortAnimations([...this.state.array])
        const arrayBars = document.getElementsByClassName("array-bar")
        let animation, loopStatus
        for(let i = 0; i < animations.length; i++) {   
            animation = animations[i]
            if (animation[0] === "select") {
                arrayBars[animation[1]].style.backgroundColor = "red"
                arrayBars[animation[2]].style.backgroundColor = "red"
                
            } else if (animation[0] === "de-select") {
                arrayBars[animation[1]].style.backgroundColor = "#008ECC"
                arrayBars[animation[2]].style.backgroundColor = "#008ECC"
            
            } else if (animation[0] === "change-height"){
                let changedArray = [...this.state.array]
                changedArray[animation[1]] = animation[2]
                this.setState({array: changedArray})
                
            } else if (animation[0] === "shift") {
                let changedArray = [...this.state.array]
                let j = animation[2],
                    i = animation[1]
                while(j >= i) {
                    changedArray[j + 1] = changedArray[j]
                    j--
                }
                this.setState({array: changedArray})
            }
            loopStatus = new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve("loop done")
                }, 8)
            })
            await loopStatus
        }
        
    }

    getInsertionSortAnimations = (arr) => {
        const animations = []
        let j, temp
        animations.push(["sorted", 0])
        for (let i = 1; i < arr.length; i++) {
            animations.push(["select", i])
            j = i
            while (j > 0 && arr[j] < arr[j - 1] ) {
                animations.push(["swap", j, arr[j], arr[j - 1]])
                temp = arr[j]
                arr[j] = arr[j - 1]
                arr[j - 1] = temp
                j--
            }
            animations.push(["sorted", j])
        }
        return animations
    }

    async sortInsertion() {
        const animations = this.getInsertionSortAnimations([...this.state.array])
        const arrayBars = document.getElementsByClassName("array-bar")
        let animation, loopStatus
        for(let i = 0; i < animations.length; i++) {   
            animation = animations[i]
            if (animation[0] === "select") {
                    arrayBars[animation[1]].style.backgroundColor = "red"
                
            } else if (animation[0] === "sorted") {
                    arrayBars[animation[1]].style.backgroundColor = "green"
                
            } else if (animation[0] === "swap"){
                    arrayBars[animation[1]].style.backgroundColor = "green"
                    let changedArray = [...this.state.array]
                    changedArray[animation[1]] = animation[3]
                    this.setState({array: changedArray})
                    
                    arrayBars[animation[1] - 1].style.backgroundColor = "red"
                    changedArray = [...this.state.array]
                    changedArray[animation[1] - 1] = animation[2]
                    this.setState({array: changedArray})
                
            }
            loopStatus = new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve("loop done")
                }, 10)
            })
            await loopStatus
        }
        
    }

    getCocktailSortAnimations = (arr) => {
        const animations = []
        let i = 0,
            j = arr.length - 1,
            odd = true,
            index
        while(i < j) {
            index = i
            if(odd) {
                for(let k = i; k < j; k++) {
                    animations.push(["select", k, k + 1])
                    if(arr[k] > arr[k + 1]) {
                        animations.push(["swap", k, k + 1, arr[k], arr[k + 1]])
                        let temp = arr[k]
                        arr[k] = arr[k + 1]
                        arr[k + 1] = temp
                    } else {
                        animations.push(["no-swap", k, k + 1])
                    }
                }
                animations.push(["sorted", j])
                j--
            } else {
                for(let k = j; k > i; k--) {
                    animations.push(["select", k, k - 1])
                    if(arr[k] < arr[k - 1]) {
                        animations.push(["swap", k, k - 1, arr[k], arr[k - 1]])
                        let temp = arr[k]
                        arr[k] = arr[k - 1]
                        arr[k - 1] = temp
                    } else {
                        animations.push(["no-swap", k, k - 1])
                    }
                }
                animations.push(["sorted", i])
                i++
            }
            odd = !odd
        }
        animations.push(["sorted", i])
        return animations
    }

    async sortCoctail() {
        const animations = this.getCocktailSortAnimations([...this.state.array])
        const arrayBars = document.getElementsByClassName("array-bar")
        let animation, loopStatus
        for(let i = 0; i < animations.length; i++) {   
            animation = animations[i]
            if (animation[0] === "select") {
                arrayBars[animation[1]].style.backgroundColor = "red"
                arrayBars[animation[2]].style.backgroundColor = "red"
                
            } else if (animation[0] === "sorted") {
                arrayBars[animation[1]].style.backgroundColor = "green"
            
            } else if (animation[0] === "swap") {
                arrayBars[animation[1]].style.backgroundColor = "#008ECC"
                let changedArray = [...this.state.array]
                changedArray[animation[1]] = animation[4]
                this.setState({array: changedArray})
                
                arrayBars[animation[2]].style.backgroundColor = "#008ECC"
                changedArray = [...this.state.array]
                changedArray[animation[2]] = animation[3]
                this.setState({array: changedArray})

            } else if(animation[0] === "no-swap") {
                arrayBars[animation[1]].style.backgroundColor = "#008ECC"
                arrayBars[animation[2]].style.backgroundColor = "#008ECC"
            }
            
            loopStatus = new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve("loop done")
                }, 0)
            })
            await loopStatus
        }
        
    }


    getBubbleSortAnimations = (arr) => {
        const animations = []
        for(let i = arr.length - 1; i > 0; i--) {
            for(let j = 0; j < i; j++) {
                animations.push(["select", j])
                if(arr[j] > arr[j + 1]) {
                    animations.push(["swap", j, arr[j], arr[j + 1]])
                    let temp = arr[j]
                    arr[j] = arr[j + 1]
                    arr[j + 1] = temp
                } else {
                    animations.push(["no-swap", j])
                }
            }
            animations.push(["sorted", i])
        }
        animations.push(["sorted", 0])
        return animations
    }

    async sortBubble() {
        const animations = this.getBubbleSortAnimations([...this.state.array])
        const arrayBars = document.getElementsByClassName("array-bar")
        let animation, loopStatus
        for(let i = 0; i < animations.length; i++) {   
            animation = animations[i]
            if (animation[0] === "select") {
                arrayBars[animation[1]].style.backgroundColor = "red"
                arrayBars[animation[1] + 1].style.backgroundColor = "red"
                
            } else if (animation[0] === "sorted") {
                arrayBars[animation[1]].style.backgroundColor = "green"
            
            } else if (animation[0] === "swap") {
                arrayBars[animation[1]].style.backgroundColor = "#008ECC"
                let changedArray = [...this.state.array]
                changedArray[animation[1]] = animation[3]
                this.setState({array: changedArray})
                
                arrayBars[animation[1] + 1].style.backgroundColor = "#008ECC"
                changedArray = [...this.state.array]
                changedArray[animation[1] + 1] = animation[2]
                this.setState({array: changedArray})

            } else if(animation[0] === "no-swap") {
                arrayBars[animation[1]].style.backgroundColor = "#008ECC"
                arrayBars[animation[1] + 1].style.backgroundColor = "#008ECC"
            }
            
            loopStatus = new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve("loop done")
                }, 0)
            })
            await loopStatus
        }
        
    }


    getNewArray = (min, max, size) => {
        const arr = []
        for (let i = 0; i < size; i++) {
            let randomValue = Math.floor(Math.random() * (max - min + 1) + min)
            arr.push(randomValue)
        }
        return arr
    }



    render() {
        return (
            <div>
                <ArrayContainer array={this.state.array} colors={this.state.colors}/>
                <ButtonSection 
                sorts={{
                    insertion: this.sortInsertion,
                    cocktail: this.sortCoctail,
                    bubble: this.sortBubble,
                    merge: this.sortMerge

                }}/>
            </div>
        )
    }
}



export default SortVisualizer