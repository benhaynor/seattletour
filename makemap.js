/*
 * The simple program flys google maps dude aroud seattle.
 */

var map;
var tourGuide;

function Destination(latLng, zoomLevel,pictures){
	this.type = "Destination";
	this.latLng = latLng;
	this.zoomLevel = zoomLevel;
	this.name = name;
	this.pictures = pictures || [];
	this.currentPicture = -1;
}

Destination.prototype.action = function(){
	if (this.currentPicture == -1){
  	map.setZoom(this.zoomLevel);
  	map.panTo(this.latLng);
	} else if (this.currentPicture <= this.pictures.length) {
		window.console.log("got me", this.currentPicture);
		var cp = this.pictures[this.currentPicture];
		cp.action();
	}
	this.currentPicture ++;
	if (this.currentPicture >= this.pictures.length){
		window.console.log("done");
		return "done";	
	} else{
		window.console.log("not done");
		return "not done";
	}
}

function imageEvents(imageList,srcFolder){
	var imageEventList = [];
	var openner = new ModalEvent(new modal($('<img align="middle" src="' + srcFolder + '/' +imageList[0]+ '">')));
	imageEventList.push(openner);
	for (var i=1; i < imageList.length; i ++){
		imageEventList.push(new NextImageEvent(
					$('<img src="' + srcFolder + '/' + imageList[i] + '">'),
					openner.modal));
	}
	imageEventList.push(openner);
	return imageEventList;
}

var seattleCenterLatLng = new google.maps.LatLng(47.62049,-122.349649);
var usaCenterView = new Destination(new google.maps.LatLng(38.891033,-94.833984),4);
var waCenterView = new Destination(seattleCenterLatLng,7);
var seattleCenterView = new Destination(seattleCenterLatLng,9);
var olympicPictures = imageEvents(["1olympics.jpg","2olympics.jpg","3olympics.jpg"],"imgs/olympics");
var olympicCenterView = new Destination(new google.maps.LatLng(47.709762,-123.475342),9, olympicPictures);
var cascadesPictures = imageEvents(["1cascades.jpg","2cascades.jpg","3cascades.jpg"],"imgs/cascades");
var cascadesCenterView = new Destination(new google.maps.LatLng(47.805776,-121.069336),9, cascadesPictures);
var queeneAnneView = new Destination(new google.maps.LatLng(47.635182,-122.35736),9);
var queeneAnneViewMiddle = new Destination(new google.maps.LatLng(47.635182,-122.35736),12);
var seattleSkyline = imageEvents(['skyline1.jpg','skyline2.jpg'],'imgs/skyline');
var queeneAnneZoom = new Destination(new google.maps.LatLng(47.635182,-122.35736),14,seattleSkyline);
var imgList = imageEvents(["spaceNeedle.jpg","emp.jpg", "bumbershoot.jpg","foklife.jpg"],"imgs/seattleCenter");
var spaceNeedle = new Destination(seattleCenterLatLng,14,imgList);
var pikePlacePictures = imageEvents(['pikeplace1.jpg','pikeplace2.jpg','pikeplace3.jpg'],'imgs/pikeplace');
var pikePlaceMarket = new Destination(new google.maps.LatLng(47.610136,-122.342057),14, pikePlacePictures);
var garfieldPictures = imageEvents(['0garfield.jpg','brucelee1.jpg','brucelee2.jpg','0jimi.jpg','1jimi.jpg'],'imgs/garfield');
var garfieldHigh = new Destination(new google.maps.LatLng(47.605334,-122.301807),14, garfieldPictures);
var uwPictures = imageEvents(['0uw.jpg','1uw.jpg'],'imgs/uw');
var universityOfWashington = new Destination(new google.maps.LatLng(47.65601,-122.30934),14,uwPictures);
var ballardPictures = imageEvents(['0locks.jpg','1locks.jpg','2locks.jpg'],'imgs/ballardlocks');
var ballardLocks = new Destination(new google.maps.LatLng(47.666705,-122.398068),14,ballardPictures);
var discoveryPictures = imageEvents(['0discovery.jpg','1discovery.jpg','2discovery.jpg','3discovery.jpg'], 'imgs/discoverypark');
var discoverParkLighthouse = new Destination(new google.maps.LatLng(47.661977,-122.435782),14, discoveryPictures);
var cafeMoxPictures = imageEvents(['cafemox1.jpg','cafemox2.jpg','magic.jpg','warhammer1.jpg'],'imgs/cafemox');
var cafeMoxZoomOut = new Destination(new google.maps.LatLng(47.664986,-122.380418),14);
var cafeMoxZoomIn = new Destination(new google.maps.LatLng(47.664986,-122.380418),15,cafeMoxPictures);
var tractorPictures = imageEvents(['outside.jpg','band.jpg','band1.jpg','swing.jpg'],'imgs/tractorTavern');
var tractorTavern = new Destination(new google.maps.LatLng(47.665764,-122.382626),15,tractorPictures);
var collegeInnPictures = imageEvents(['cip.jpg'],'imgs/collegeInnPub');
var collegeInnPub = new Destination(new google.maps.LatLng(47.65544,-122.31298),15,collegeInnPictures);

var events = [usaCenterView, waCenterView,seattleCenterView,olympicCenterView,
		cascadesCenterView, queeneAnneView, queeneAnneViewMiddle, queeneAnneZoom, 
		spaceNeedle, pikePlaceMarket, garfieldHigh, universityOfWashington,
		ballardLocks, discoverParkLighthouse,cafeMoxZoomOut,cafeMoxZoomIn,
		tractorTavern,collegeInnPub
		];

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

function NextImageEvent(bodyNode,modal){
	this.modal = modal;	
	this.bodyNode = bodyNode;
}

NextImageEvent.prototype.action = function(){
	this.modal.empty();
	this.modal.append(this.bodyNode);
}

function ModalEvent(modal){
	this.modal = modal;
	var me = this;
	this.action = function(){
		me.modal.modal("toggle");
	}
}	

function TourGuide(map, events){
	this.map = map;
	this.events = events;
	this.currentEvent = 0;
}

TourGuide.prototype.nextEvent = function(){
	var ce = this.events[this.currentEvent];	
	if(ce.action() == "done"){
		this.currentEvent ++;	
	};	
}

function addKeyPressListener(){
	$(document).keypress(function(event){
		tourGuide.nextEvent();
	})
}

function initialize() {
	var mapOptions = {
		center: new google.maps.LatLng( 47.6097, -122.3331),
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById("map_canvas"),mapOptions);
	tourGuide = new TourGuide(map, events);	
	tourGuide.nextEvent();
	addKeyPressListener();
}
