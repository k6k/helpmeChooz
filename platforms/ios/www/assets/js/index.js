/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        app.contactList();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        
        
    },
    contactList  : function(){
        //alert(navigator.contacts);
        var options      = new ContactFindOptions();
        options.filter   = "";
        options.multiple = true;
        options.desiredFields = [navigator.contacts.fieldType.id,navigator.contacts.fieldType.nickname,navigator.contacts.fieldType.displayName,navigator.contacts.fieldType.phoneNumbers];
        var fields       = [navigator.contacts.fieldType.nickname,navigator.contacts.fieldType.displayName,  navigator.contacts.fieldType.id];
        navigator.contacts.find(fields, this.onSuccess, this.onError, options);
    },
    onSuccess : function(contacts){
         var content  = "";
         var tab_contact = '';
         var phone = '';
         for (var i = contacts.length - 1; i >= 0; i--) {
            
            if(contacts[i].phoneNumbers != null ) {
                phone = contacts[i].phoneNumbers[0].value; console.log(contacts[i].phoneNumbers[0]);
                content += '<div class="item" id="space-list-bottom">';
                content += '<div class="right floated"><input type="checkbox" class="checkbox-style" data-phone="'+phone+'"></div><div class="content"><div class="header">';
                content += contacts[i].displayName;
                content += '</div></div></div>';
                //content += '<li class="table-view-cell">'+contacts[i].displayName+' : '+phone+'<button class="btn btn-negative btn-contact" data-phone="'+phone+'">Button</button></li>';
                
            }
           
            //content += '<li class="table-view-cell">'+contacts[i].displayName+' : <button class="btn btn-negative btn-contact" data-phone="">Button</button></li>';
            
            if(i == 0){
                $('#contactList').append(content+'<div class="ui bottom attached teal button">Envoyer</div> ');
                
                $( '.checkbox-style' ).unbind( 'click' );
                    $('.checkbox-style').on('click',function(e){                 
                    var _phone = $(this).attr('data-phone');
                    tab_contact +=_phone+',';
                    $('#listcontact').val(tab_contact.slice(0,-1));
                });
                
                
            }
         };
         
    },
    onError :function(){
        alert('onError!');
    },
    sendSms : function(){
        var contactInput = $('#listcontact').val();
        window.plugins.socialsharing.shareViaSMS ('Lorem Ipsum', contactInput, this.socialOnSuccess, this.socialOnError);                                                 
    },
    socialShare : function(){
        var contactInput = $('#listcontact').val();
        window.plugins.socialsharing.shareViaFacebook(contactInput, null, 'http://www.iesacom', this.socialOnSuccess, this.socialOnError);                                                  
    },
    socialOnSuccess: function(msg) {
            alert('SocialSharing success: ' + msg);
    },
    socialOnError: function(msg) {
        //alert('error');
            alert('Le sms partira surement un jour: '+$('#listcontact').val()+'/' + msg);
    },
    pickToShare : function(){
        navigator.camera.getPicture(
                  function(img){
                    //alert('ok' + img);
                    window.plugins.socialsharing.shareViaFacebook('Look this', 'data:image/jpg;base64,'+img, 'http://www.helpmechooz.com', this.socialOnSuccess, this.socialOnError);
                  }, function(e){
                    alert('error '+e);
                  }, 
            { 
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY
            }
        );
    },
    storeFirstPict : function(id){
        var pict = this.picturePicker(id);
        console.log($('#'+id).val());
    },
    picturePicker :function(id){
        navigator.camera.getPicture(
                  function(img){
                   $('#'+id).val(img);
                    
                  }, function(e){
                    console.log('error '+e);
                  }, 
            { 
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY
            }
        );
    },
    storeSecondPict : function(id){
        var pict = this.picturePicker(id);
    },
    showPict        : function(){
        var pict_1 = $('#pict_1_address').val();
        $('#pict_1').attr('src','data:image/jpg;base64,'+pict_1);

        var pict_2 = $('#pict_2_address').val();
        $('#pict_2').attr('src','data:image/jpg;base64,'+pict_2);
    }

};

app.initialize();