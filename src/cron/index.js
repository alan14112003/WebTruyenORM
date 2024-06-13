import ClearUploadFolderTask from './ClearUploadFolder.task'
import PingServerTask from './PingServer.task'
import PublicChapterTask from './PublicChapter.task'

const initCron = () => {
  // PingServerTask.start()
  ClearUploadFolderTask.start()
  PublicChapterTask.start()
}

export default initCron
