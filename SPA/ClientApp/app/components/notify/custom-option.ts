
import { ToastOptions } from 'ng2-toastr';

export class CustomOption extends ToastOptions {
    animate = 'flyRight';
    newestOnTop = false;
    showCloseButton = true;
}



// ToastOptions Configurations - Override any above....
//###########################################################################

//By default, the toastr will show up at top right corner of the page view, and will automatically dismiss in 3 seconds.You can configure the toasts using ToastOptions class. Currently we support following options:

//toastLife: (number)

//Determines how long an auto- dismissed toast will be shown.Defaults to 5000 miliseconds.

//    dismiss: (string)

//Determine how a displayed toaster can be dismissed.Allowed values are: 'auto', 'click', 'controlled'(value should all be lowercase).

//    auto: Toaster will auto dismiss in miliseconds(value specified by toastLife).This is default value.
//        click: Toaster will be dismissed when user click on it.
//            controlled: Toaster will be dismissed based on specific logic.
//                newestOnTop: (boolean)

//Determines whether new toast should show up on top of previous toast Defaults to false.

//    showCloseButton: (boolean)

//Determines whether toast should include 'x' close button.Defaults to false.

//    maxShown: (number)

//Determines maximum number of toasts can be shown on the page in the same time.Defaults to 5.

//positionClass: (string)

//Determines where on the page the toasts should be shown.Here are list of values:

//toast - top - right(Default)
//toast - top - center
//toast - top - left
//toast - top - full - width
//toast - bottom - right
//toast - bottom - center
//toast - bottom - left
//toast - bottom - full - width
//messageClass: (string)

//CSS class for message within toast.

//    titleClass: (string)

//CSS class for title within toast.

//    animate: (string)

//You have following choice: 'fade', 'flyLeft' or 'flyRight'.

//    fade: makes every toast either fade in or fade out.
//        flyLeft: makes every toast fly in from left side.
//            flyRight: makes every toast fly in from right side.Defaults to 'fade'.You can set animate: null to disable animations.
//                enableHTML: (boolean)

//Allow input of message to be HTML.Default to false.
//####################################################################################