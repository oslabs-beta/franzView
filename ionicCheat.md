Ionic cheatsheet.

\*\*Super uncommon components
<IonApp> --> Can only be used once per application
<IonPage> --> This is only used on a page that is being routed to.

- In our public folder we should have the structure of pages and components.
  <IonHeader> --> This can only be used once per view.
  <IonContent> --> This can also only be used once per view.

\*\* Headers

- This appear to be the main components in a header. It seems that toolbox and title are normally used for headers.
  <IonHeader>
  <IonToolBox> --> Seems to have top and bottom margin or padding.
  <IonTitle> --> Seems to add margin or padding on the left and right.

\*\* Buttons

- Buttons seem to be fairly straight forward
  <IonButton>
  <IonBackButton defaultHref="/"> --> I believe you have to tell it where to go back to, but it may go back to the previous page automatically, but that state can get lost if there is a refresh. I believe it gives a chevron icon automatically
  -- Button colors:
  <IonButton color='primary'> --> secondary, tertiary, sucess, warning, danger, light, medium, dark
  -- Button size:
  <IonButton size='large'> small and defaults to medium
  <IonButton expand='full'> Full fills the whole screen
  <IonButton expand='block'> fills most of screen, but has margins
  --Button shape
  <IonButton shape="round"> I only see round as an option
  -- Icons
  <IonIcon slot='start' icon={star}> Icons have to be imported from ionIcons, and declared inside. Slot can be 'start', 'end', or 'icon-only'
  if you have text and an icon text should be after ionicon if slot start and before if slot end.
  -- Example
  <IonButton>
  <IonIcon slot="start" icon={star} />
  Left Icon
  </IonButton>
  -- Fill
  <IonButton fill='outline'> this makes it so it is outlined only (I think).

  \*\* Chips
  -- chip are basically buttons but different style. They follow the same rules as buttons except to have text you have to have a lable.
  -- This example shows a chip that has two icons.
  <IonChip>
  <IonIcon icon={pin} color="primary" />
  <IonLabel>Icon Chip</IonLabel>
  <IonIcon icon={close} />
  </IonChip>

!!!!! I haven't been able to complete this. And there is a lot more. Hopefully this will help everyone get started.

\*\* Lists

\*\* Menu

\*\* Card

\*\* Modal
