var trigger = $qsa('.modal__trigger');
var modals = $qsa('.modal'); // the entire modal (takes up entire window)
var modalsbg = $qsa('.modal__bg'); // the entire modal (takes up entire window)
var content = $qsa('.modal__content'); // the inner content of the modal
var closers = $qsa('.modal__close'); // an element used to close the modal
var len = trigger.length;
var isOpen = false;



function $qsa(el) {
  return document.querySelectorAll(el);
}

function skip () {
  document.getElementById('landing').style.display="none";
  document.getElementById('landing-background').style.display="none";
  bindActions();
}



var open = function(event) {
  event.preventDefault();
  var self = this;
  var modalId = self.dataset.modal;

   var len = modalId.length;
   // remove the '#' from the string
   var modalIdTrimmed = modalId.substring(1, len);
   // select the modal we want to activate
   var modal = document.getElementById(modalIdTrimmed);

   if (!isOpen) {
      // select the content inside the modal
      var content = modal.querySelector('.modal__content');
      // reveal the modal
      modal.classList.add('modal--active');
      // reveal the modal content
      content.classList.add('modal__content--active');
    }

    if (!isOpen && modalId=="#hanzi") {
      var content = modal.querySelector('.modal__content');
      // reveal the modal
      modal.classList.add('modal--active');
      // reveal the modal content
      content.classList.add('modal__content--active');
    }

    isOpen = true;


};


var closeWholeModal = function (event) {
  event.preventDefault();
  event.stopImmediatePropagation();
  var target = event.target;
  var self = this;

  var modalId = self.dataset.modal;


  var div = document.getElementById('about-modal');

  if (isOpen && target.classList.contains('modal__bg') || target.classList.contains('modal__close')) {

   // make the hidden div visible again and remove the transforms so it scales back to its original size
   div.style.opacity = '1';
   div.removeAttribute('style');

   /**
   * iterate through the modals and modal contents and triggers to remove their active classes.
   * remove the inline css from the trigger to move it back into its original position.
   */


   for (var i = 0; i < len; i++) {
    modals[i].classList.remove('modal--active');
    content[i].classList.remove('modal__content--active');
    trigger[i].style.transform = 'none';
    trigger[i].style.webkitTransform = 'none';
    trigger[i].classList.remove('modal__trigger--active');
   }

   // when the temporary div is opacity:1 again, we want to remove it from the dom
   isOpen = false;
 }


 if (isOpen && (target.classList.contains('closeOnboardingModal') || target.classList.contains('hanzi-modal-close')) ) {
   walkthrough.closeOnboardingModal();
   div.style.opacity = '1';
   div.removeAttribute('style');

   /**
   * iterate through the modals and modal contents and triggers to remove their active classes.
   * remove the inline css from the trigger to move it back into its original position.
   */


   for (var i = 0; i < len; i++) {
    modals[i].classList.remove('modal--active');
    content[i].classList.remove('modal__content--active');
    trigger[i].style.transform = 'none';
    trigger[i].style.webkitTransform = 'none';
    trigger[i].classList.remove('modal__trigger--active');
   }

   isOpen = false;

 }


}


var bindActions = function() {

  for (var i = 0; i < len; i++) {
    trigger[i].addEventListener('click', open, false);
    closers[i].addEventListener('click', closeWholeModal, false);
    modalsbg[i].addEventListener('click', closeWholeModal, false);
  }
};


// (function() {
//
//   $(document).ready(function() {

    var walkthrough;
    walkthrough = {
      index: 0,
      nextScreen: function() {
        if (this.index < this.indexMax()) {
          this.index++;
          return this.updateScreen();
        }
      },
      prevScreen: function() {
        if (this.index > 0) {
          this.index--;
          return this.updateScreen();
        }
      },
      updateScreen: function() {
        this.reset();
        this.goTo(this.index);
        return this.setBtns();
      },
      setBtns: function() {
        var $lastBtn, $nextBtn, $prevBtn;
        $nextBtn = $('.next-screen');
        $prevBtn = $('.prev-screen');
        $lastBtn = $('.finish');
        if (walkthrough.index === walkthrough.indexMax()) {
          $nextBtn.prop('disabled', true);
          $prevBtn.prop('disabled', false);
          return $lastBtn.addClass('active').prop('disabled', false);
        } else if (walkthrough.index === 0) {
          $nextBtn.prop('disabled', false);
          $prevBtn.prop('disabled', true);
          return $lastBtn.removeClass('active').prop('disabled', true);
        } else {
          $nextBtn.prop('disabled', false);
          $prevBtn.prop('disabled', false);
          return $lastBtn.removeClass('active').prop('disabled', true);
        }
      },
      goTo: function(index) {
        $('.screen').eq(index).addClass('active');
        return $('.dot').eq(index).addClass('active');
      },
      reset: function() {
        return $('.screen, .dot').removeClass('active');
      },
      indexMax: function() {

        return $('.screen').length - 1;
      },
      closeOnboardingModal: function() {
        // $('.walkthrough, .shade').removeClass('reveal');
        return setTimeout((() => {
          // $('.walkthrough, .shade').removeClass('show');
          this.index = 0;
          return this.updateScreen();
        }), 200);
      },
      openModal: function() {

        $('.walkthrough, .shade').addClass('show');
        setTimeout((() => {
          return $('.walkthrough, .shade').addClass('reveal');
        }), 200);
        return this.updateScreen();
      }
    };
    $('.next-screen').click(function() {
      return walkthrough.nextScreen();
    });
    $('.prev-screen').click(function() {
      return walkthrough.prevScreen();
    });
    $('.close').click(function() {
      return walkthrough.closeOnboardingModal();
    });
    $('.open-walkthrough').click(function() {
      return walkthrough.openModal();
    });
    walkthrough.openModal();

    // Optionally use arrow keys to navigate walkthrough
    // return $(document).keydown(function(e) {
    //   switch (e.which) {
    //     case 37:
    //       // left
    //       walkthrough.prevScreen();
    //       break;
    //     case 38:
    //       // up
    //       walkthrough.openModal();
    //       break;
    //     case 39:
    //       // right
    //       walkthrough.nextScreen();
    //       break;
    //     case 40:
    //       // down
    //       walkthrough.closeOnboardingModal();
    //       break;
    //     default:
    //       return;
    //   }
    //   e.preventDefault();
    // });

  // });

// }).call(this);
bindActions();
