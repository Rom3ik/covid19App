export interface WidgetContent {
  title: string,
}

export interface Reloadable {
  loading: boolean,
  reload?(): void
}
