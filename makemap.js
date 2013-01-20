/*
 * The simple program flys google maps dude aroud seattle.
 */

var map;
var tourGuide;

function Destination(latLng, zoomLevel, name){
	this.type = "Destination";
	this.latLng = latLng;
	this.zoomLevel = zoomLevel;
	this.name = name;
}

Destination.prototype.action = function(){
	map.setZoom(this.zoomLevel);
	map.panTo(this.latLng);
	window.console.log(this.name);
}

var seattleCenterLatLng = new google.maps.LatLng(47.641141,-122.35382);
var usaCenterView = new Destination(new google.maps.LatLng(38.891033,-94.833984),4);
var waCenterView = new Destination(seattleCenterLatLng,7);
var seattleCenterView = new Destination(seattleCenterLatLng,9);
var olympicCenterView = new Destination(new google.maps.LatLng(47.709762,-123.475342),9);
var cascadesCenterView = new Destination(new google.maps.LatLng(47.805776,-121.069336),9);
var warrenAveN = new Destination(new google.maps.LatLng(47.641141,-122.35382), 14);
var spaceNeedle = new Destination(new google.maps.LatLng(47.62049,-122.349649),14);
var pikePlaceMarket = new Destination(new google.maps.LatLng(47.610136,-122.342057),14);

var sayHiEvent = new ModalEvent(modal($("<p>Hi</p>")));
var events = [usaCenterView, waCenterView,seattleCenterView,olympicCenterView,
		cascadesCenterView,seattleCenterView, warrenAveN,
		spaceNeedle, pikePlaceMarket];

/*
 * Creates a modal object with 
 *
 */
function modal(bodyContent){
	var modalBody = $('<div></div>').addClass('modal-body').append(bodyContent);
	return $('<div></div>').attr({
		"class": 'modal hide fade',
		tabindex:"-1",
		role:"dialog",
		"aria-labelledby":"myModalLabel",
		"aria-hidden":"true"
	}).append(modalBody);
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
		tourGuide.nextEvent();
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
	addKeyPressListener();
}
