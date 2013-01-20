/*
 * The simple program flys google maps dude aroud seattle.
 */

var map;
var tourGuide;

function Destination(latLng, zoomLevel, script){
	this.type = "Destination";
	this.latLng = latLng;
	this.zoomLevel = zoomLevel;
	this.script = script;
}

Destination.prototype.action = function(){
	map.setZoom(this.zoomLevel);
	map.panTo(this.latLng);
}

var usaCenterView = new Destination(new google.maps.LatLng(38.891033,-94.833984),4);
var waCenterView = new Destination(new google.maps.LatLng(47.641141,-122.35382),7);
var sayHiEvent = new ModalEvent(modal("sayHiEvent"),$("<p>Hi!</p>"));
var events = [usaCenterView, waCenterView,sayHiEvent,sayHiEvent];

function modal(id, bodyContent){
	return $('<div></div>').attr({
		"class": 'modal hide fade',
		tabindex:"-1",
		"id": id,
		role:"dialog",
		"aria-labelledby":"myModalLabel",
		"aria-hidden":"true"
	});
}

function ModalEvent(modal){
	this.modal = modal;
	var me = this;
	this.action = function(){
		me.modal.modal("toggle");
	}
}	

function TourGuide(map){
	this.map = map;
	this.events = [];
	this.currentEvent = -1;
}

TourGuide.prototype.addEvent =  function(latLng){
	this.events.push(latLng);
}

TourGuide.prototype.nextEvent = function(){
	this.currentEvent ++;	
	var ce = this.events[this.currentEvent];	
	ce.action();	
}

function addKeyPressListener(){
	$(document).keypress(function(event){
		window.console.log(event);
	})
}

function initialize() {
	var mapOptions = {
		center: new google.maps.LatLng( 47.6097, -122.3331),
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById("map_canvas"),mapOptions);
	tourGuide = new TourGuide(map);	
	for (var i in events){
		tourGuide.addEvent(events[i]);
	}
	tourGuide.nextEvent();
	$("#controls").click(function(){
		tourGuide.nextEvent();
	});
	addKeyPressListener();
}
