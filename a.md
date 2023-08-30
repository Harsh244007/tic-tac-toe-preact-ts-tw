import { useState} from •react'
const generateBoard = (size)=> {
const newBoard = []
for (let i = ø; i < size; i++) {
newBoard.push( .Array(size)) )
return newBoard
const checkHorizota1 = (board) {
for (let row of board) {
const rowSet= new Set(row)
if (rowSet.size==1 && !rowSet.has(undefined)) {
return true
}
}
}

2
const rowsToC01ums = (board) {
const newBoard =
let column =
white (column board. length) {
const ne*ov = [J
for (let row = ø; row < length;
[ row] [column] )
newBoa rd. push ( newRow )
column++
return neaoard


5
6
7
8
9
0
1
2
3
5
6
7
8
9
1
2
3
5
6
7
8
9
const diagnotToRow = (board) {
const newBoard =
tet increment =
let decrement = board. length —I
white(incrænt < length) (
newBoard J . push ( board ( incremensl ( increent) )
newBoard [I) . push ( (increment) )
inc renent++
decrement++
const checkForWin (board) {
// horizontal
if {
return true
// vertical
if (checkHorizotat( rowsToCotums(board))) {
return true
// diagnol
if ( checkHo ( diagn01T0Row(board) ) ) {
return true


x
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
return (
<div»
(row, r) {
return (
<div
display: 'flex',
{row.map( (cell, c) {
return (
ediv
handleC1ick(r, c)}
border: 'solid white Ipx%
height: ,
width: '5Øpx• ,
display: • flex •
justifyContent: •center •
atignltes: •centers